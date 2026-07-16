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

用法（無頭執行，從 blender-tots/ 資料夾）：
  /Applications/Blender.app/Contents/MacOS/Blender -b tots-model.blend \
      -P enhance_tots_model.py -- <輸出資料夾>

輸出：<輸出資料夾>/tots-model.blend（已強化）、tots-model.glb、
      render_top.png、render_iso.png（與生成腳本同參數的驗證圖）

※ 本腳本應該從「未強化」的 tots-model.blend 執行；對已強化過的檔案重複執行
  會疊加倒角與 extrude，不是冪等操作。
"""

import bpy
import sys
import os
from math import radians
from mathutils import Vector

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

# 屬性材質的 roughness 覆寫（D 項：讓水感/冰感與草地、岩石有差異）
ROUGHNESS_TWEAK = {
    "ToTS_water": 0.30,
    "ToTS_frigid": 0.45,
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

# ── 開始 ─────────────────────────────────────────────────
print(f"=== 視覺強化開始，輸出到 {OUT_DIR} ===")
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
add_rock_box("高原_岩芯", PX0 + 8, PY0 + 8, PX1 - 8, PY1 - 8, VOID_Z, PLATEAU_TOP - SLAB_T)

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

# ── 存檔＋匯出 ────────────────────────────────────────────
os.makedirs(OUT_DIR, exist_ok=True)
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
