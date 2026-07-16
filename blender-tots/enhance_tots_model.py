# -*- coding: utf-8 -*-
"""
劍之考驗參照模型 — 視覺強化後製腳本（Phase 1）
================================================
generate_tots_model.py 產出的 tots-model.blend 之後又累積了多筆「手動調整」
（部分關卡位置／尺寸、中級盆地平移與拓寬、標籤對位），這些修改只存在於 .blend、
不在生成腳本裡。因此視覺強化不能重跑生成腳本（會蓋掉手動修改），改用本腳本
「讀取現有 .blend → 後製 → 另存」的方式執行。

強化內容（皆不改變房間座標、尺寸、名稱、分類色彩等攻略語意）：
  A. 方塊試煉房加入小倒角（bevel），保留可辨識的方正輪廓
  B. 曲面物件（黑暗半球、休息圓片、導師之塔、塔底盆地）套用 smooth shading（依角度分邊）
  C. 地形立體感：高原底部補「岩芯」方塊、平原外緣補岩壁裙板，
     蓋住原本從低角度可見的懸空薄殼
  D. 材質層次：房間／圓片「頂面 vs 側面」分兩種明度的材質；水面／寒冷屬性調低 roughness
     （全部走 Principled BSDF 基本欄位，glTF 匯出安全）
  E. 文字標籤：曲線解析度 3 → 4，加入極小 extrude 增加立體感
  F. 中級盆地重塑：深度 12→18、坡度改為明確可見的 80°（維持高原邊緣開口位置不變，
     內縮盆地底尺寸，讓斜坡在原本的凹陷範圍內容納下更深的落差）
  G. 指北標示（箭頭＋"N"）顏色改白
  H. 房間樓層文字標籤縮小 2 個單位（不影響圓形地標／指北標籤大小）
  I. 無實體表面顏色改為更淡的淺綠色
  J. 導師之間塔底盆地下沉極小量，避免與平原表面共面造成 z-fighting 閃爍

用法（無頭執行，從 blender-tots/ 資料夾）：
  /Applications/Blender.app/Contents/MacOS/Blender -b tots-model.blend \
      -P enhance_tots_model.py -- <輸出資料夾>

輸出：<輸出資料夾>/tots-model.blend（已強化）、tots-model.glb、
      render_top.png、render_iso.png（與生成腳本同參數的驗證圖）

※ 本腳本應該從「未強化」的 tots-model.blend 執行；對已強化過的檔案重複執行
  會疊加倒角與 extrude，不是冪等操作。
"""

import bpy
import bmesh
import json
import sys
import os
from math import radians, tan
from mathutils import Vector, noise as bnoise

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT_DIR = os.path.abspath(argv[0]) if argv else os.path.dirname(os.path.abspath(__file__))

# ── 參數 ─────────────────────────────────────────────────
BEVEL_WIDTH_MAX = 1.1      # 房間方塊倒角寬度上限（世界單位；房間邊長約 21–48）
BEVEL_SEGMENTS = 2         # 倒角段數（低面數，控制 GLB 大小）
SMOOTH_ANGLE_DEG = 40.0    # smooth shading 的分邊角度（大於此角度的邊保持硬邊）
SIDE_DARKEN = 0.72         # 側面材質相對頂面的明度倍率（linear 空間）
LABEL_RESOLUTION_U = 4     # 文字曲線解析度（原 3；升到 4 約 +215KB / +9%）
LABEL_EXTRUDE = 0.0        # 文字厚度：實測 0.1 就會讓 GLB 從 2.3MB 暴增到 7.5MB
                           # （每個 CJK 字形輪廓都要生成側壁＋背面），故維持 0 純平面
ROCK_COLOR = (0.086, 0.062, 0.040, 1.0)  # 岩壁／岩芯顏色（linear，暗棕）
ROCK_ROUGHNESS = 0.92

BASIN_DEPTH_OLD = 12.0     # 生成腳本原始深度（BASIN_DEPTH）
BASIN_DEPTH_NEW = 18.0     # 加深後的深度
SLOPE_BASIN_DEG = 80.0     # 坡度（與生成腳本 SLOPE_BASIN_DEG 一致；不變，只是加深後水平投影
                           # 變長，原本 12 深時的投影只有 2.1 個單位，貼著房間幾乎看不出斜面，
                           # 這才是「看起來像 90°」的真正原因，並非角度本身錯誤）
COMPASS_WHITE = (1.0, 1.0, 1.0, 1.0)   # 指北標示改為白色（linear 白＝sRGB 白，無需換算）
LABEL_SIZE_SHRINK = 2.0    # 房間樓層文字標籤縮小量（世界單位）
VOID_COLOR_NEW = "#e6f2da"  # 無實體表面新色：比原本 #a8d98a 更淡的淺綠
MS_BASIN_Z_NUDGE = -0.06   # 導師之間塔底盆地下沉量，讓其開口邊緣的頂面完全沒入平原表面下方
                           # （原本頂面 z=0 與平原表面 z=0 完全共面，才會 z-fighting 閃爍）

def hex_rgba(h, a=1.0):
    """sRGB hex → linear RGBA（與生成腳本的 hex_rgba 相同換算，供本腳本重新產生貼圖用）"""
    h = h.lstrip("#")
    s = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in s]
    return (*lin, a)

def run_for(depth, angle_deg):
    """給定高度差與坡度角，回傳水平延伸距離（與生成腳本同名函式一致）"""
    return depth / tan(radians(angle_deg))

# 屬性材質的 roughness 覆寫（D 項：讓水感/冰感與草地、岩石有差異）
ROUGHNESS_TWEAK = {
    "ToTS_water": 0.30,
    "ToTS_frigid": 0.45,
}

# 屬性材質的微發光（Phase 3：火山＝暖橘微光、雷雨＝閃電黃微光；
# 走 Principled 的 Emission 欄位，glTF 匯出成 emissiveFactor，安全）
EMISSIVE_TWEAK = {
    "ToTS_volcano": ((1.0, 0.35, 0.08, 1.0), 0.35),
    "ToTS_storm":   ((1.0, 0.85, 0.25, 1.0), 0.25),
}

# 點擊互動用：屬性 key → 顯示名稱（寫進 tots-layout.json 供網頁端顯示）
ATTR_LABELS = {
    "normal": "一般房間", "water": "水域", "void": "奈落",
    "dark": "黑暗", "storm": "雷雨", "volcano": "火山", "frigid": "寒冷",
    "rest": "休息平台", "oasis": "綠洲", "basin": "盆地地標",
}

# 依生成腳本常數推得的地形邊界（世界座標；高原/平原自生成以來未被手動移動，
# 已用物件實際 bounding box 驗證過）
SX0, SX1 = -645.0, 77.0     # 固體地面全域 X
SY0, SY1 = -626.5, 540.0    # 固體地面全域 Y（南緣含 SOUTH_SCALE 放大）
PX0, PX1 = -645.0, -120.0   # 高原 X
PY0, PY1 = -59.0, 540.0     # 高原 Y
PLATEAU_TOP = 80.0
SLAB_T = 2.0
VOID_Z = -22.0              # 無實體表面高度（平原外緣岩壁的底）

# 黑暗屬性半球（保持整顆 smooth，不做頂/側分材質）
DARK_DOME_NAMES = {"中級6F", "中級7F", "中級8F", "中級9F", "中級10F"}

# ── 工具 ─────────────────────────────────────────────────
def select_only(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

def shade_smooth_by_angle(obj, angle_deg=SMOOTH_ANGLE_DEG):
    """面設 smooth＋依角度標記 sharp edge（直接寫進 mesh data，
    不用 modifier——glTF 匯出預設不套用 modifier，資料層級的作法才保證生效）"""
    select_only(obj)
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=radians(angle_deg))
    except AttributeError:
        bpy.ops.object.shade_smooth()

_side_mats = {}
def get_side_mat(base_mat):
    """取得（快取）側面用的暗色變體材質"""
    if base_mat.name in _side_mats:
        return _side_mats[base_mat.name]
    side = base_mat.copy()
    side.name = f"{base_mat.name}_side"
    bsdf = side.node_tree.nodes.get("Principled BSDF")
    # 只有純色材質才做側面暗色變體（草地類走貼圖，不在房間上使用）
    c = bsdf.inputs["Base Color"].default_value
    bsdf.inputs["Base Color"].default_value = (
        c[0] * SIDE_DARKEN, c[1] * SIDE_DARKEN, c[2] * SIDE_DARKEN, c[3])
    _side_mats[base_mat.name] = side
    return side

def split_top_side_materials(obj, top_normal_z=0.6):
    """頂面保留原材質、其餘面改用暗色側面材質（依面法線 Z 分類）"""
    mesh = obj.data
    if not mesh.materials:
        return
    base = mesh.materials[0]
    side = get_side_mat(base)
    if len(mesh.materials) < 2:
        mesh.materials.append(side)
    for poly in mesh.polygons:
        poly.material_index = 0 if poly.normal.z > top_normal_z else 1

def apply_bevel(obj, width, segments=BEVEL_SEGMENTS):
    select_only(obj)
    mod = obj.modifiers.new("EnhanceBevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = radians(50)
    bpy.ops.object.modifier_apply(modifier=mod.name)

def min_dimension(obj):
    d = obj.dimensions
    return min(d.x, d.y, d.z)

def add_box_mat(name, x0, y0, x1, y1, z0, z1, mat, coll):
    """世界座標軸對齊方塊（與生成腳本 add_box 相同幾何，改接受材質物件而非 key）"""
    bpy.ops.mesh.primitive_cube_add(size=2)
    o = bpy.context.active_object
    o.name = name
    o.scale = ((x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2)
    o.location = ((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(mat)
    for c in o.users_collection:
        c.objects.unlink(o)
    coll.objects.link(o)
    return o

def add_wedge_mat(name, points, mat, coll):
    """凸包楔形（與生成腳本 add_wedge 相同做法，供斜坡牆使用）"""
    bm = bmesh.new()
    for p in points:
        bm.verts.new(p)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001)
    bmesh.ops.convex_hull(bm, input=bm.verts)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.data.materials.append(mat)
    coll.objects.link(o)
    return o

def add_ramp_ns_mat(name, x0, x1, y_a, z_a, y_b, z_b, mat, coll):
    z_floor = min(z_a, z_b) - 0.05
    pts = [
        (x0, y_a, z_a), (x1, y_a, z_a), (x0, y_b, z_b), (x1, y_b, z_b),
        (x0, y_a, z_floor), (x1, y_a, z_floor), (x0, y_b, z_floor), (x1, y_b, z_floor),
    ]
    return add_wedge_mat(name, pts, mat, coll)

def add_ramp_ew_mat(name, y0, y1, x_a, z_a, x_b, z_b, mat, coll):
    z_floor = min(z_a, z_b) - 0.05
    pts = [
        (x_a, y0, z_a), (x_a, y1, z_a), (x_b, y0, z_b), (x_b, y1, z_b),
        (x_a, y0, z_floor), (x_a, y1, z_floor), (x_b, y0, z_floor), (x_b, y1, z_floor),
    ]
    return add_wedge_mat(name, pts, mat, coll)

# ── 開始 ─────────────────────────────────────────────────
print(f"=== 視覺強化開始，輸出到 {OUT_DIR} ===")

# 字型路徑自我修復：.blend 內的字型是「相對路徑」（//../../..），只有當 .blend 位於
# blender-tots/ 原位時才解析得到系統字型；從其他資料夾（備份、暫存）開啟會解析失敗，
# CJK 字形會整批轉不出來（標籤只剩英數字）。這裡把失效的字型路徑重指到系統字型。
FONT_CANDIDATES = ("/System/Library/Fonts/STHeiti Light.ttc",
                   "/System/Library/Fonts/PingFang.ttc",
                   "/System/Library/Fonts/Hiragino Sans GB.ttc")
for f in bpy.data.fonts:
    if f.filepath in ("", "<builtin>") or f.packed_file:
        continue
    if not os.path.exists(bpy.path.abspath(f.filepath)):
        for cand in FONT_CANDIDATES:
            if os.path.exists(cand):
                print(f"字型路徑失效，重指：{f.name} → {cand}")
                f.filepath = cand
                break

colls = {c.name: c for c in bpy.data.collections}

# A＋D. 方塊試煉房：倒角 → 頂/側分材質
room_coll = colls["試煉房"]
box_count = dome_count = 0
for obj in list(room_coll.objects):
    if obj.type != "MESH":
        continue
    if obj.name in DARK_DOME_NAMES:
        shade_smooth_by_angle(obj, 80)   # 半球整顆平滑（角度放寬避免經緯線硬邊）
        dome_count += 1
        continue
    # 一般方塊（含起點框）：倒角寬度不超過最短邊的 1/3，避免薄框變形
    width = min(BEVEL_WIDTH_MAX, min_dimension(obj) / 3)
    apply_bevel(obj, width)
    split_top_side_materials(obj)
    box_count += 1
print(f"房間方塊倒角＋分材質：{box_count}，黑暗半球平滑：{dome_count}")

# B＋D. 休息房／綠洲／盆地圓片：側面平滑＋頂/側分材質
circle_count = 0
for obj in list(colls["休息與地形"].objects):
    if obj.type != "MESH":
        continue
    shade_smooth_by_angle(obj)
    split_top_side_materials(obj)
    circle_count += 1
print(f"圓形地標平滑＋分材質：{circle_count}")

# B. 導師之間：全部曲面物件平滑
for obj in list(colls["導師之間"].objects):
    if obj.type == "MESH":
        shade_smooth_by_angle(obj)
print("導師之間曲面平滑完成")

# D. 屬性材質 roughness 微調（水面感／冰面感）
for mat_name, rough in ROUGHNESS_TWEAK.items():
    m = bpy.data.materials.get(mat_name)
    if m:
        m.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = rough
        # 側面變體同步
        sm = _side_mats.get(mat_name)
        if sm:
            sm.node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = rough
print("材質 roughness 調整完成")

# D+. 屬性材質微發光（火山／雷雨），側面變體同步
for mat_name, (em_color, em_strength) in EMISSIVE_TWEAK.items():
    for m in (bpy.data.materials.get(mat_name), _side_mats.get(mat_name)):
        if not m:
            continue
        bsdf = m.node_tree.nodes["Principled BSDF"]
        try:
            bsdf.inputs["Emission Color"].default_value = em_color
            bsdf.inputs["Emission Strength"].default_value = em_strength
        except KeyError:
            pass   # 舊版 Blender 欄位名不同時跳過，不影響其餘強化
print("材質微發光調整完成")

# C. 地形立體感：高原岩芯＋平原外緣岩壁裙板
rock = bpy.data.materials.new("ToTS_rock")
rock.use_nodes = True
rb = rock.node_tree.nodes["Principled BSDF"]
rb.inputs["Base Color"].default_value = ROCK_COLOR
rb.inputs["Roughness"].default_value = ROCK_ROUGHNESS

terrain_coll = colls.get("休息與地形") or list(bpy.data.collections)[0]

def add_rock_box(name, x0, y0, x1, y1, z0, z1):
    bpy.ops.mesh.primitive_cube_add(size=2)
    o = bpy.context.active_object
    o.name = name
    o.scale = ((x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2)
    o.location = ((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(rock)
    for c in o.users_collection:
        c.objects.unlink(o)
    terrain_coll.objects.link(o)
    return o

# 高原岩芯：藏在 85° 懸崖斜壁後面，堵住從低角度看進去的懸空縫隙。
# 內縮 8 單位 > 懸崖斜壁的水平投影（80 / tan85° ≈ 7），保證不穿出斜壁。
# ※ 中級凹陷盆地（底 68、比高原面低 12）在高原範圍內，岩芯必須繞開，
#   否則會把盆地凹陷整個填掉（Phase 1 曾發生：整塊岩芯頂到 78，盆地變淺）。
#   作法：盆地四周四塊頂到高原面下方、盆地正下方一塊只頂到盆地底下方。
BASIN_X0, BASIN_X1 = -557.0, -297.0   # 中級盆地「原始」floor 世界座標（加深前，含先前的
BASIN_Y0, BASIN_Y1 = 355.0, 439.0     # 平移＋拓寬調整；下面 F 步驟會用這組舊值算出新 floor）
BASIN_FLOOR = PLATEAU_TOP - BASIN_DEPTH_NEW  # 盆地底 z=62（原本 -12，這裡改用新深度 18）
BM = 4.0                              # 盆地邊界的安全間隙（80° 斜壁水平投影約 2.1，小於此值
                                      # 即可，深度改 18 後投影約 3.2，仍小於 BM，不須跟著調整）
CORE_TOP = PLATEAU_TOP - SLAB_T
add_rock_box("高原_岩芯_北", PX0 + 8, BASIN_Y1 + BM, PX1 - 8, PY1 - 8, VOID_Z, CORE_TOP)
add_rock_box("高原_岩芯_南", PX0 + 8, PY0 + 8, PX1 - 8, BASIN_Y0 - BM, VOID_Z, CORE_TOP)
add_rock_box("高原_岩芯_西", PX0 + 8, BASIN_Y0 - BM, BASIN_X0 - BM, BASIN_Y1 + BM, VOID_Z, CORE_TOP)
add_rock_box("高原_岩芯_東", BASIN_X1 + BM, BASIN_Y0 - BM, PX1 - 8, BASIN_Y1 + BM, VOID_Z, CORE_TOP)
add_rock_box("高原_岩芯_盆地下", BASIN_X0 - BM, BASIN_Y0 - BM, BASIN_X1 + BM, BASIN_Y1 + BM,
             VOID_Z, BASIN_FLOOR - SLAB_T - 1.0)

# 平原外緣岩壁裙板（厚 2，從無實體表面 -22 到平原面 0）：
# 東緣（全段）、南緣（全段）、西緣（南側塊段）、北緣（東側帶段）
SKIRT_T = 2.0
add_rock_box("平原岩壁_東", SX1 - SKIRT_T, SY0, SX1, SY1, VOID_Z, 0)
add_rock_box("平原岩壁_南", SX0, SY0, SX1, SY0 + SKIRT_T, VOID_Z, 0)
add_rock_box("平原岩壁_西", SX0, SY0, SX0 + SKIRT_T, PY0, VOID_Z, 0)
add_rock_box("平原岩壁_北", PX1, SY1 - SKIRT_T, SX1, SY1, VOID_Z, 0)
print("地形岩芯＋岩壁裙板完成")

# E. 文字標籤品質
label_count = 0
for obj in bpy.data.objects:
    if obj.type == "FONT":
        obj.data.resolution_u = LABEL_RESOLUTION_U
        obj.data.extrude = LABEL_EXTRUDE
        label_count += 1
print(f"文字標籤品質調整：{label_count}")

# F. 中級盆地重塑：加深至 18、坡度維持 80° 但改成真正看得出來的落差。
# 原本 12 深時的斜坡水平投影只有 2.1 個單位（run_for(12,80)），緊貼房間幾乎看不出
# 傾斜，視覺上讀成直上直下的 90°；加深到 18 後投影變成約 3.2 個單位，才會露出明顯
# 的斜面。「高原邊緣」＝斜坡與高原面交會的開口位置，維持不動（BASIN_Y1+old_run 等
# 原始值），改成往盆地內側縮：floor（盆地底）的尺寸內縮 (new_run-old_run)，讓斜坡
# 在同一個開口範圍內走完更深的落差。
old_run = run_for(BASIN_DEPTH_OLD, SLOPE_BASIN_DEG)
new_run = run_for(BASIN_DEPTH_NEW, SLOPE_BASIN_DEG)
_delta = new_run - old_run
NEW_BASIN_X0 = BASIN_X0 + _delta
NEW_BASIN_X1 = BASIN_X1 - _delta
NEW_BASIN_Y0 = BASIN_Y0 + _delta
NEW_BASIN_Y1 = BASIN_Y1 - _delta

for _n in ("凹陷盆地_底", "凹陷盆地_北坡", "凹陷盆地_南坡", "凹陷盆地_東坡", "凹陷盆地_西坡"):
    _o = bpy.data.objects.get(_n)
    if _o:
        _mesh = _o.data
        bpy.data.objects.remove(_o, do_unlink=True)
        bpy.data.meshes.remove(_mesh, do_unlink=True)

basin_mat = bpy.data.materials["ToTS_surface_basin"]
plateau_coll = colls["高原"]
add_box_mat("凹陷盆地_底", NEW_BASIN_X0, NEW_BASIN_Y0, NEW_BASIN_X1, NEW_BASIN_Y1,
            BASIN_FLOOR - SLAB_T, BASIN_FLOOR, basin_mat, plateau_coll)
add_ramp_ns_mat("凹陷盆地_北坡", NEW_BASIN_X0, NEW_BASIN_X1, NEW_BASIN_Y1, BASIN_FLOOR,
                BASIN_Y1 + old_run, PLATEAU_TOP, basin_mat, plateau_coll)
add_ramp_ns_mat("凹陷盆地_南坡", NEW_BASIN_X0, NEW_BASIN_X1, NEW_BASIN_Y0, BASIN_FLOOR,
                BASIN_Y0 - old_run, PLATEAU_TOP, basin_mat, plateau_coll)
add_ramp_ew_mat("凹陷盆地_東坡", NEW_BASIN_Y0, NEW_BASIN_Y1, NEW_BASIN_X1, BASIN_FLOOR,
                BASIN_X1 + old_run, PLATEAU_TOP, basin_mat, plateau_coll)
add_ramp_ew_mat("凹陷盆地_西坡", NEW_BASIN_Y0, NEW_BASIN_Y1, NEW_BASIN_X0, BASIN_FLOOR,
                BASIN_X0 - old_run, PLATEAU_TOP, basin_mat, plateau_coll)
print(f"中級盆地重塑完成：深度 {BASIN_DEPTH_OLD:.0f}→{BASIN_DEPTH_NEW:.0f}，"
      f"floor 內縮 {_delta:.2f}/邊，高原開口位置不變")

# G. 指北標示改白（箭頭 + "N" 文字共用 ToTS_compass 材質）
_compass_mat = bpy.data.materials.get("ToTS_compass")
if _compass_mat:
    _compass_mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = COMPASS_WHITE
    print("指北標示顏色已改為白色")

# H. 房間樓層文字標籤縮小（只動「房間」標籤，不動圓形地標／指北標籤）
shrunk = 0
for obj in room_coll.objects:
    if obj.type != "MESH" or obj.name.endswith("_起點框"):
        continue
    lbl = bpy.data.objects.get(f"標籤_{obj.name.split('.')[0]}")
    if lbl and lbl.type == "FONT":
        lbl.data.size = max(1.0, lbl.data.size - LABEL_SIZE_SHRINK)
        shrunk += 1
print(f"房間樓層文字標籤縮小完成：{shrunk} 個")

# I. 無實體表面改為更淡的淺綠色（重新產生貼圖：草地材質的顏色是烘進雜訊圖的像素，
# 不是走 Base Color 欄位，必須重新產生同一張圖片的像素資料才會生效）
_void_img = bpy.data.images.get("grass_surface_void")
if _void_img:
    w, h = _void_img.size
    r, g, b, _a = hex_rgba(VOID_COLOR_NEW)
    pixels = [0.0] * (w * h * 4)
    for y in range(h):
        for x in range(w):
            n = bnoise.noise((x / w * 10.0, y / h * 10.0, 0.0))
            factor = 1.0 + n * 0.18
            i = (y * w + x) * 4
            pixels[i] = max(0.0, r * factor)
            pixels[i + 1] = max(0.0, g * factor)
            pixels[i + 2] = max(0.0, b * factor)
            pixels[i + 3] = 1.0
    _void_img.pixels[:] = pixels
    _void_img.pack()   # 圖片原本就是 packed 狀態，修改 pixels 後必須重新 pack 才會存進 .blend，
                       # 否則存檔時仍會用「初次 pack 當下」的舊資料，改色不會生效
    print(f"無實體表面顏色已改為 {VOID_COLOR_NEW}")

# J. 導師之間塔底盆地下沉極小量，避免頂面與平原表面（同為 z=0）共面 z-fighting
_ms_basin = bpy.data.objects.get("導師之間_塔底盆地")
if _ms_basin:
    _ms_basin.location.z += MS_BASIN_Z_NUDGE
    print(f"導師之間塔底盆地下沉 {abs(MS_BASIN_Z_NUDGE)} 個單位，修正與平原表面共面閃爍")

# ── 點擊互動用座標表（依 .blend 內物件「實際」世界座標輸出，
#    包含所有手動調整；generate 腳本的 tots_layout.json 是生成當下的舊資料）──
def world_bbox(o):
    cs = [o.matrix_world @ Vector(c) for c in o.bound_box]
    xs = [c.x for c in cs]; ys = [c.y for c in cs]; zs = [c.z for c in cs]
    return min(xs), min(ys), min(zs), max(xs), max(ys), max(zs)

pick_layout = {"rooms": [], "circles": [], "tower": None}
for obj in room_coll.objects:
    if obj.type != "MESH" or obj.name.endswith("_起點框"):
        continue
    mat0 = obj.data.materials[0].name if obj.data.materials else ""
    attr = mat0.removeprefix("ToTS_").removesuffix("_side")
    x0, y0, z0, x1, y1, z1 = world_bbox(obj)
    pick_layout["rooms"].append({
        "label": obj.name.split(".")[0],
        "attr": attr, "attr_label": ATTR_LABELS.get(attr, attr),
        "x0": round(x0, 1), "y0": round(y0, 1), "x1": round(x1, 1), "y1": round(y1, 1),
        "z0": round(z0, 1), "z1": round(z1, 1),
    })
for obj in colls["休息與地形"].objects:
    if obj.type != "MESH":
        continue
    mat0 = obj.data.materials[0].name if obj.data.materials else ""
    if mat0 == "ToTS_rock":
        continue   # 岩芯／岩壁不是可點擊地標
    kind = mat0.removeprefix("ToTS_").removesuffix("_side")
    x0, y0, z0, x1, y1, z1 = world_bbox(obj)
    pick_layout["circles"].append({
        "label": obj.name.split("_")[0],
        "kind": kind, "kind_label": ATTR_LABELS.get(kind, kind),
        "x": round((x0 + x1) / 2, 1), "y": round((y0 + y1) / 2, 1),
        "r": round((x1 - x0) / 2, 1), "z": round(z1, 1),
    })
tower_obj = bpy.data.objects.get("導師之間_柱身")
if tower_obj:
    x0, y0, z0, x1, y1, z1 = world_bbox(tower_obj)
    pick_layout["tower"] = {"label": "導師之間",
                            "x": round((x0 + x1) / 2, 1), "y": round((y0 + y1) / 2, 1),
                            "r": round((x1 - x0) / 2, 1)}
print(f"點擊座標表：房間 {len(pick_layout['rooms'])}、圓形地標 {len(pick_layout['circles'])}")

# ── 存檔＋匯出 ────────────────────────────────────────────
os.makedirs(OUT_DIR, exist_ok=True)
with open(os.path.join(OUT_DIR, "tots-layout.json"), "w", encoding="utf-8") as f:
    json.dump(pick_layout, f, ensure_ascii=False, indent=1)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT_DIR, "tots-model.blend"))
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT_DIR, "tots-model.glb"),
                          export_format="GLB")

# ── 驗證渲染（與生成腳本同參數）──────────────────────────────
scene = bpy.context.scene
for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE", "BLENDER_WORKBENCH"):
    try:
        scene.render.engine = eng
        break
    except TypeError:
        continue

void_x0, void_x1 = -863.0, 282.0
void_y0, void_y1 = -664.0, 555.0
center = Vector(((void_x0 + void_x1) / 2, (void_y0 + void_y1) / 2, 0))
extent = max(void_x1 - void_x0, void_y1 - void_y0)

def render_to(path, cam_loc, ortho=False, ortho_scale=900):
    bpy.ops.object.camera_add(location=cam_loc)
    cam = bpy.context.active_object
    direction = center - Vector(cam_loc)
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    if ortho:
        cam.data.type = "ORTHO"
        cam.data.ortho_scale = ortho_scale
    cam.data.clip_end = 5000
    scene.camera = cam
    scene.render.filepath = path
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 1600
    bpy.ops.render.render(write_still=True)

render_to(os.path.join(OUT_DIR, "render_top.png"),
          (center.x, center.y, 900), ortho=True, ortho_scale=extent * 1.15)
iso_k = extent / 722.0
render_to(os.path.join(OUT_DIR, "render_iso.png"),
          (center.x + 620 * iso_k, center.y - 700 * iso_k, 520 * iso_k))

print("=== 視覺強化完成 ===")
