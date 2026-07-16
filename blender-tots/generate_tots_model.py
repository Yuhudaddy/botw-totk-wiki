# -*- coding: utf-8 -*-
"""
劍之考驗（Trial of the Sword）參照模型生成腳本
================================================
依據「ToTS Map-模型CH.pdf」（By CHC Yu-Da）的平面配置生成簡易 3D 參照模型。

用法（無頭執行）：
  /Applications/Blender.app/Contents/MacOS/Blender -b -P generate_tots_model.py

輸出（與腳本同資料夾）：
  tots-model.blend   Blender 檔
  tots-model.glb     網頁用 glTF（<model-viewer> 可直接載入）
  tots_layout.json   房間座標表（之後網頁互動標籤可用）
  render_top.png     俯視驗證圖
  render_iso.png     東南方斜視驗證圖

座標系統：+X＝東、+Y＝北、Z＝上。
世界原點 (0,0,0) 對齊 PDF 上標示的 (0,0,0)（平原東側帶南段）。
高度（PLATEAU_TOP、塔高等）PDF 無資料，皆為預設猜值，之後對照遊戲截圖微調。
"""

import bpy
import bmesh
import json
import os
import random
from math import radians, tan, sqrt
from mathutils import Vector, noise as bnoise

# ── 可調參數 ──────────────────────────────────────────────
SCALE = 1.0          # 公尺 / PDF像素（1300px 寬版面）
PLATEAU_TOP = 80.0   # 高原表面高度（平原表面 = 0）※猜值
BASIN_DEPTH = 12.0   # 高原上凹陷盆地（中級1-4F/12-16F所在）的深度 ※猜值
SLAB_T = 2.0         # 地面殼層厚度
TILE_T = 1.2         # 休息房／綠洲／盆地（圓形地標）薄片厚度
BOX_ROOM_H = 40.0    # 一般（方形）試煉房立體方塊的高度，比基準邊長 30 高一點
BOX_SHRINK = 0.85    # 一般方塊型試煉房整體縮小比例（長寬高都縮，中心點與樓面高度不變），
                     # 不套用在中級6-10F的黑暗屬性半球體上
DARK_DOME_H_RATIO = 1.0  # 黑暗屬性（中級6-10F）半球體的「高度／半徑」比例，1.0＝正半球
# 導師之間塔身：酒瓶狀（寬柱身＋窄瓶頸），依使用者提供的實際比例：
# 柱身直徑＝5 個關卡並排寬度（ROOM_SIZE=30 → 5*30=150，半徑 75）；
# 柱身高度（圓頂＋直筒段，即「圓弧收頸段之前」）＝高原高度 x 6 ＝ 80*6 = 480。
TOWER_BODY_R = 75.0   # 柱身（含底部圓頂）半徑
TOWER_DOME_H = 60.0   # 底部圓頂（酒瓶底）高度
TOWER_CYL_H = 420.0   # 柱身直筒段高度；DOME_H+CYL_H = 480 = PLATEAU_TOP*6
TOWER_NECK_R = 25.0   # 瓶頸（頂端窄柱）半徑
TOWER_NECK_H = 70.0   # 瓶頸往上延伸的高度
# 柱身收窄到瓶頸的過渡段，改用「球面」而非直線斜面（圓錐台），外觀才會是平滑外凸的圓弧，
# 不再是有稜有角的直線。收窄段的高度不是自由參數，是球面幾何本身決定的：一顆半徑＝柱身
# 半徑的球，球心對齊在柱身頂端，往上收窄到「半徑＝瓶頸半徑」那個高度，用畢氏定理算出來。
MS_BASIN_R = 100.0   # 導師之間塔底盆地（floor）半徑，需大於柱身半徑留出邊緣
MS_BASIN_DEPTH = 8.0 # 導師之間塔底盆地深度 ※猜值

# 南側區域整體放大倍率：套用在「平原南側塊＋東側帶的南緣」「導師之間偏移高原南緣的距離」
# 「無實體南側留白」，用來容納放大後的巨大柱體，並加大高原懸崖到平原內容物之間的留白距離。
# 高原本身與房間網格座標維持不動（已對照 PDF 驗證過，不受此倍率影響），純粹是南側平原的
# 風格化放大，不再嚴格對應 PDF 原始比例。
SOUTH_SCALE = 2.5
LABEL_SIZE = 13.0    # 房間文字標籤大小

# 斜坡角度（使用者依遊戲內觀察提供，皆為與水平面夾角）
SLOPE_PLATEAU_DEG = 85.0  # 高原 ↔ 平原
SLOPE_BASIN_DEG = 80.0    # 高原上凹陷盆地 ↔ 高原面
SLOPE_MS_DEG = 70.0       # 平原 ↔ 導師之間塔底盆地

def run_for(depth, angle_deg):
    """給定高度差與坡度角，回傳水平延伸距離"""
    return depth / tan(radians(angle_deg))

# 房間排版的隨機微亂（呼應空拍圖：房間大小、角度、間距並不整齊）
JITTER_SEED = 20260716
rng = random.Random(JITTER_SEED)

# PDF 像素 → 世界座標的原點（PDF 上 (0,0,0) 的像素位置）
ORIGIN_PX = (938.0, 688.0)

def W(px, py):
    """PDF 像素座標 → 世界 XY（+X東、+Y北）"""
    return ((px - ORIGIN_PX[0]) * SCALE, (ORIGIN_PX[1] - py) * SCALE)

# ── 平面配置資料（單位：PDF 像素，y 向下）────────────────────
SOLID = (293, 148, 1015, 855)     # 固體地面全域 (x0,y0,x1,y1)
PLATEAU = (293, 148, 818, 747)    # 劍之考驗高原（貼齊固體區西北角）。南邊界（747）比房間網格
                                  # 本身（最後一列在 540）多留了一段距離，長度依使用者提供的參考
                                  # 圖比例抓「頂級最下列 → 中級盆地南側邊緣」的長度（540-333=207），
                                  # 從 540 起算 = 747，讓高原懸崖到平原內容物之間有足夠留白。
BASIN = (370, 249, 600, 333)      # 高原上的凹陷盆地（含中級前段兩列）

COLS5 = [408, 470, 516, 562, 608]             # 5欄列的欄位中心（第2~5欄對齊 COLS6[2..5]，
                                               # 讓初級3F~6F 和其下的 12F/10F/8F/9F 及往下每層都精準對齊）
COLS6 = [378, 424, 470, 516, 562, 608]        # 初級第一列（6欄）
ROW = {1: 173, 2: 225, 3: 269, 4: 312, 5: 360, 6: 404, 7: 450, 8: 494, 9: 540}

ROOM_SIZE = 30.0     # 基準邊長（正方形房間；實際生成時再套用小幅隨機縮放與位移）
BIG_SIZE = 50.0      # 一般特大房間的邊長

# (標籤, 屬性, 欄x, 列y, 寬x, 深y, 是否起點, 是否在凹陷盆地內)
# 寬/深預設皆為 ROOM_SIZE（正方形）；個別房間可指定不同的寬深比。
ROOMS = [
    # 初級 第1列
    ("初級1F", "normal", COLS6[0], ROW[1], ROOM_SIZE, ROOM_SIZE, True,  False),
    ("初級2F", "normal", COLS6[1], ROW[1], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級3F", "normal", COLS6[2], ROW[1], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級4F", "normal", COLS6[3], ROW[1], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級5F", "normal", COLS6[4], ROW[1], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級6F", "normal", COLS6[5], ROW[1], ROOM_SIZE, ROOM_SIZE, False, False),
    # 初級 水域列（11F 為左右向的特大水池，深度維持一般房間大小避免侵入下方中級盆地）
    ("初級11F", "water", COLS5[0], ROW[2], BIG_SIZE,  ROOM_SIZE, False, False),
    ("初級12F", "water", COLS5[1], ROW[2], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級10F", "water", COLS5[2], ROW[2], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級8F",  "water", COLS5[3], ROW[2], ROOM_SIZE, ROOM_SIZE, False, False),
    ("初級9F",  "water", COLS5[4], ROW[2], ROOM_SIZE, ROOM_SIZE, False, False),
    # 中級 前段（奈落列，位於凹陷盆地內；4F 與 2F 之間空一欄）
    ("中級1F", "void", COLS5[0], ROW[3], ROOM_SIZE, ROOM_SIZE, True,  True),
    ("中級3F", "void", COLS5[1], ROW[3], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級2F", "void", COLS5[2], ROW[3], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級4F", "void", COLS5[4], ROW[3], ROOM_SIZE, ROOM_SIZE, False, True),
    # 中級 中段（13F/14F 水池，位於凹陷盆地內）
    ("中級16F", "normal", COLS5[0], ROW[4], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級15F", "normal", COLS5[1], ROW[4], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級14F", "water",  COLS5[2], ROW[4], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級13F", "water",  COLS5[3], ROW[4], ROOM_SIZE, ROOM_SIZE, False, True),
    ("中級12F", "normal", COLS5[4], ROW[4], ROOM_SIZE, ROOM_SIZE, False, True),
    # 中級 黑暗列
    ("中級6F",  "dark", COLS5[0], ROW[5], ROOM_SIZE, ROOM_SIZE, False, False),
    ("中級7F",  "dark", COLS5[1], ROW[5], ROOM_SIZE, ROOM_SIZE, False, False),
    ("中級8F",  "dark", COLS5[2], ROW[5], ROOM_SIZE, ROOM_SIZE, False, False),
    ("中級9F",  "dark", COLS5[3], ROW[5], ROOM_SIZE, ROOM_SIZE, False, False),
    ("中級10F", "dark", COLS5[4], ROW[5], ROOM_SIZE, ROOM_SIZE, False, False),
    # 頂級 雷雨列（編號由西往東遞減，1F 起點在東端）
    ("頂級5F", "storm", COLS5[0], ROW[6], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級4F", "storm", COLS5[1], ROW[6], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級3F", "storm", COLS5[2], ROW[6], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級2F", "storm", COLS5[3], ROW[6], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級1F", "storm", COLS5[4], ROW[6], ROOM_SIZE, ROOM_SIZE, True,  False),
    # 頂級 火山列
    ("頂級7F",  "volcano", COLS5[0], ROW[7], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級8F",  "volcano", COLS5[1], ROW[7], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級9F",  "volcano", COLS5[2], ROW[7], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級10F", "volcano", COLS5[3], ROW[7], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級11F", "volcano", COLS5[4], ROW[7], ROOM_SIZE, ROOM_SIZE, False, False),
    # 頂級 寒冷列（編號由西往東遞減）
    ("頂級17F", "frigid", COLS5[0], ROW[8], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級16F", "frigid", COLS5[1], ROW[8], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級15F", "frigid", COLS5[2], ROW[8], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級14F", "frigid", COLS5[3], ROW[8], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級13F", "frigid", COLS5[4], ROW[8], ROOM_SIZE, ROOM_SIZE, False, False),
    # 頂級 末列（23F 在 22F 之前，照 PDF）：
    # 座標依 PDF 連通元件精確量測換算（非等距五等分）：19F/23F 幾乎對齊上一列同欄，
    # 20F 略右偏、21F 略左偏，22F 對齊頂休12F 正下方；20F→21F 之間的間隙明顯最大，
    # 與空拍配置圖比對後方向一致（空拍圖因斜角透視、絕對比例會失真，故位置以 PDF 為準）。
    ("頂級19F", "normal", 410, ROW[9], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級20F", "normal", 461, ROW[9], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級21F", "normal", 530, ROW[9], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級23F", "normal", 583, ROW[9], ROOM_SIZE, ROOM_SIZE, False, False),
    ("頂級22F", "normal", 628, ROW[9], ROOM_SIZE, ROOM_SIZE, False, False),
]

# 休息房／綠洲／盆地（圓形）：(標籤, 類型, x, y, 半徑)
CIRCLES = [
    ("初休7F",  "rest",  633, 196, 17),
    ("盆地",    "basin", 682, 195, 19),
    ("盆地",    "basin", 729, 195, 19),
    ("綠洲",    "oasis", 341, 244, 14),
    ("綠洲",    "oasis", 341, 312, 14),
    ("中休5F",  "rest",  633, 269, 17),
    ("中休11F", "rest",  633, 404, 17),
    ("頂休6F",  "rest",  341, 425, 17),
    ("頂休12F", "rest",  633, 494, 17),
    ("頂休18F", "rest",  341, 540, 17),
]

# ── 顏色（linear RGBA）───────────────────────────────────
def hex_rgba(h, a=1.0):
    h = h.lstrip("#")
    s = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    # 近似 sRGB→linear
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in s]
    return (*lin, a)

PALETTE = {
    # 房間屬性色：依 PDF 圖例實際取樣的色系（水池/寒冷同屬青色家族，寒冷取較淺的冰藍區分）
    "normal":  hex_rgba("#d8d4c8"),
    "water":   hex_rgba("#46d2e0"),
    "void":    hex_rgba("#242a6e"),
    "dark":    hex_rgba("#17161a"),
    "storm":   hex_rgba("#f2d43d"),
    "volcano": hex_rgba("#f0801f"),
    "frigid":  hex_rgba("#a8dde6"),
    "rest":    hex_rgba("#9fd6c8"),
    "oasis":   hex_rgba("#34b8a0"),
    "basin":   hex_rgba("#b09a78"),
    # 地面：高原／平原＝矮草地，無實體＝同色系但只做平面貼圖，其餘＝海面（不可游泳、僅視覺）
    "surface_plateau": hex_rgba("#6f9556"),
    "surface_plain":   hex_rgba("#76a05c"),
    "surface_basin":   hex_rgba("#5c8049"),
    "surface_void":    hex_rgba("#a8d98a"),
    "surface_sea":     hex_rgba("#2f6fa0"),
    "tower":   hex_rgba("#4a4d52"),  # 深灰（原本誤用深藍）
    "ms_basin": hex_rgba("#14324f"),
    "start":   hex_rgba("#22c55e"),
    "text":    hex_rgba("#202020"),
    "text_light": hex_rgba("#f2f2f2"),
    "compass": hex_rgba("#d64545"),
}

DARK_TILES = {"dark", "void"}   # 這些屬性的地磚用淺色標籤

# 需要套用草地雜訊貼圖的地面材質（高原／平原／盆地底／無實體，同一套草地色系）；
# 其餘（房間色、塔身、海面等）維持純色。海面刻意不做動態波浪貼圖，維持純色+高光即可。
GRASS_KEYS = {"surface_plateau", "surface_plain", "surface_basin", "surface_void"}

# ── 工具函式 ─────────────────────────────────────────────
_mats = {}
_grass_imgs = {}   # 每個材質各自一張「已經帶顏色」的雜訊圖，key 為材質名稱

ROUGHNESS_OVERRIDE = {"surface_sea": 0.15}   # 海面要有光澤感，其餘維持霧面草地/岩石質感

def make_colored_noise_image(name, base_color, size=256, scale=10.0, variation=0.18):
    """純 Python 產生一張已經帶顏色的雜訊圖（把顏色直接烘進像素，不靠 Shader 節點相乘）。
    原本的做法是「灰階雜訊圖 + Shader 端 Mix(Multiply) 疊底色」，Blender 內部渲染看起來沒問題，
    但 glTF 匯出器無法翻譯這種自訂節點圖（glTF 材質規格本身沒有任意節點相乘的概念），
    結果匯出後色彩資訊整個弄丟、變成純灰階雜訊圖本身。直接把顏色寫進像素才能保證匯出正確。"""
    img = bpy.data.images.new(name, width=size, height=size, alpha=False)
    r, g, b = base_color[0], base_color[1], base_color[2]
    pixels = [0.0] * (size * size * 4)
    for y in range(size):
        for x in range(size):
            n = bnoise.noise((x / size * scale, y / size * scale, 0.0))  # 約 -1..1
            factor = 1.0 + n * variation
            i = (y * size + x) * 4
            pixels[i] = max(0.0, r * factor)
            pixels[i + 1] = max(0.0, g * factor)
            pixels[i + 2] = max(0.0, b * factor)
            pixels[i + 3] = 1.0
    img.pixels[:] = pixels
    img.pack()  # 打包進檔案，glTF 匯出時會內嵌，不需外部圖檔
    return img

def get_grass_image(key, color):
    if key not in _grass_imgs:
        _grass_imgs[key] = make_colored_noise_image(f"grass_{key}", color)
    return _grass_imgs[key]

def get_mat(key):
    if key in _mats:
        return _mats[key]
    color = PALETTE[key]
    m = bpy.data.materials.new(f"ToTS_{key}")
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = ROUGHNESS_OVERRIDE.get(key, 0.8)
    if key in GRASS_KEYS:
        # 貼圖直接接到 Base Color（不透過任何 Mix/相乘節點），並且座標來源用 UV Map
        # 而非 Generated——這是最基本、最保證會被 glTF 匯出器正確保留的材質結構。
        # 沒有 UV 的物件（斜坡楔形）會退回單一取樣點，變成沒有雜訊變化的純色，
        # 色彩仍然正確，只是少了顆粒感，是可接受的取捨。
        nt = m.node_tree
        tex = nt.nodes.new("ShaderNodeTexImage")
        tex.image = get_grass_image(key, color)
        mapping = nt.nodes.new("ShaderNodeMapping")
        mapping.inputs["Scale"].default_value = (35.0, 35.0, 35.0)
        uv = nt.nodes.new("ShaderNodeUVMap")
        nt.links.new(uv.outputs["UV"], mapping.inputs["Vector"])
        nt.links.new(mapping.outputs["Vector"], tex.inputs["Vector"])
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    if color[3] < 1.0:
        bsdf.inputs["Alpha"].default_value = color[3]
        for attr, val in (("blend_method", "BLEND"), ("surface_render_method", "BLENDED")):
            try:
                setattr(m, attr, val)
            except (AttributeError, TypeError):
                pass
    _mats[key] = m
    return m

def link_to(obj, coll):
    for c in obj.users_collection:
        c.objects.unlink(obj)
    coll.objects.link(obj)

def add_box(name, x0, y0, x1, y1, z0, z1, mat_key, coll):
    """世界座標軸對齊方塊（x0<x1, y0<y1, z0<z1）"""
    bpy.ops.mesh.primitive_cube_add(size=2)  # 頂點位於 ±1，配合下方 /2 的縮放
    o = bpy.context.active_object
    o.name = name
    o.scale = ((x1 - x0) / 2, (y1 - y0) / 2, (z1 - z0) / 2)
    o.location = ((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(get_mat(mat_key))
    link_to(o, coll)
    return o

def add_plane(name, x0, y0, x1, y1, z, mat_key, coll):
    """單面薄平面（無厚度、無側壁）——用於「只是貼圖」的無實體區與海面"""
    bpy.ops.mesh.primitive_plane_add(size=2)
    o = bpy.context.active_object
    o.name = name
    o.scale = ((x1 - x0) / 2, (y1 - y0) / 2, 1)
    o.location = ((x0 + x1) / 2, (y0 + y1) / 2, z)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(get_mat(mat_key))
    link_to(o, coll)
    return o

def add_cyl(name, cx, cy, r, z0, z1, mat_key, coll, verts=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=z1 - z0,
                                        location=(cx, cy, (z0 + z1) / 2))
    o = bpy.context.active_object
    o.name = name
    o.data.materials.append(get_mat(mat_key))
    link_to(o, coll)
    return o

def add_wedge(name, points, mat_key, coll):
    """給一組 3D 點，取凸包生成實心楔形（斜坡牆用）"""
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
    o.data.materials.append(get_mat(mat_key))
    coll.objects.link(o)
    return o

def add_ramp_ns(name, x0, x1, y_a, z_a, y_b, z_b, mat_key, coll):
    """沿 X 方向延伸的斜坡牆：y=y_a 處高度 z_a，y=y_b 處高度 z_b"""
    z_floor = min(z_a, z_b) - 0.05
    pts = [
        (x0, y_a, z_a), (x1, y_a, z_a), (x0, y_b, z_b), (x1, y_b, z_b),
        (x0, y_a, z_floor), (x1, y_a, z_floor), (x0, y_b, z_floor), (x1, y_b, z_floor),
    ]
    return add_wedge(name, pts, mat_key, coll)

def add_ramp_ew(name, y0, y1, x_a, z_a, x_b, z_b, mat_key, coll):
    """沿 Y 方向延伸的斜坡牆：x=x_a 處高度 z_a，x=x_b 處高度 z_b"""
    z_floor = min(z_a, z_b) - 0.05
    pts = [
        (x_a, y0, z_a), (x_a, y1, z_a), (x_b, y0, z_b), (x_b, y1, z_b),
        (x_a, y0, z_floor), (x_a, y1, z_floor), (x_b, y0, z_floor), (x_b, y1, z_floor),
    ]
    return add_wedge(name, pts, mat_key, coll)

FONT = None
def load_font():
    global FONT
    for p in ("/System/Library/Fonts/PingFang.ttc",
              "/System/Library/Fonts/STHeiti Light.ttc",
              "/System/Library/Fonts/Hiragino Sans GB.ttc"):
        if os.path.exists(p):
            try:
                FONT = bpy.data.fonts.load(p)
                return
            except RuntimeError:
                continue

def add_label(text, x, y, z, size, coll, mat_key="text", align="CENTER"):
    bpy.ops.object.text_add(location=(x, y, z))
    o = bpy.context.active_object
    o.name = f"標籤_{text}"
    o.data.body = text
    o.data.size = size
    o.data.align_x = align
    o.data.align_y = "CENTER"
    if FONT:
        o.data.font = FONT
    o.data.extrude = 0.0
    o.data.resolution_u = 3   # 降低字形曲線解析度，縮小 GLB
    o.data.materials.append(get_mat(mat_key))
    link_to(o, coll)
    return o

# ── 場景重置 ─────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
load_font()

colls = {}
for name in ("高原", "平原", "無實體", "試煉房", "休息與地形", "導師之間", "標記與標籤"):
    c = bpy.data.collections.new(name)
    scene.collection.children.link(c)
    colls[name] = c

# ── 地面：高原（含凹陷盆地開口）─────────────────────────────
px0, py0, px1, py1 = PLATEAU
bx0, by0, bx1, by1 = BASIN
PX0, PY1 = W(px0, py0)   # 西北角 → (X西, Y北)
PX1, PY0 = W(px1, py1)   # 東南角 → (X東, Y南)
BX0, BY1 = W(bx0, by0)
BX1, BY0 = W(bx1, by1)
zt = PLATEAU_TOP
# 盆地開口四周的高原表面（北、南、西、東四片）
add_box("高原面_北", PX0, BY1, PX1, PY1, zt - SLAB_T, zt, "surface_plateau", colls["高原"])
add_box("高原面_南", PX0, PY0, PX1, BY0, zt - SLAB_T, zt, "surface_plateau", colls["高原"])
add_box("高原面_西", PX0, BY0, BX0, BY1, zt - SLAB_T, zt, "surface_plateau", colls["高原"])
add_box("高原面_東", BX1, BY0, PX1, BY1, zt - SLAB_T, zt, "surface_plateau", colls["高原"])

# 凹陷盆地：底面＋四面斜坡壁（約 80°，向上朝盆地外側展開）
zb = zt - BASIN_DEPTH
run_basin = run_for(BASIN_DEPTH, SLOPE_BASIN_DEG)
add_box("凹陷盆地_底", BX0, BY0, BX1, BY1, zb - SLAB_T, zb, "surface_basin", colls["高原"])
add_ramp_ns("凹陷盆地_北坡", BX0, BX1, BY1, zb, BY1 + run_basin, zt, "surface_basin", colls["高原"])
add_ramp_ns("凹陷盆地_南坡", BX0, BX1, BY0, zb, BY0 - run_basin, zt, "surface_basin", colls["高原"])
add_ramp_ew("凹陷盆地_東坡", BY0, BY1, BX1, zb, BX1 + run_basin, zt, "surface_basin", colls["高原"])
add_ramp_ew("凹陷盆地_西坡", BY0, BY1, BX0, zb, BX0 - run_basin, zt, "surface_basin", colls["高原"])

# ── 地面：平原（L形＝東側帶＋南側塊）───────────────────────
sx0, sy0, sx1, sy1 = SOLID
SX0, SY1 = W(sx0, sy0)
SX1, SY0_PDF = W(sx1, sy1)   # SY0_PDF：PDF 量測的原始南緣（僅供對照，不直接用來建模）

# 南側整體放大：南緣往南推遠（懸崖到平原內容物的留白增加，也才裝得下放大後的柱體），
# 東側帶的南緣一併延伸到同一條線，避免東南角出現缺角。
# 注意：平原深度是「PY0 往南固定延伸 PLAIN_DEPTH_BASE*SOUTH_SCALE」，PLAIN_DEPTH_BASE 是
# 寫死的原始基準值（不是拿目前的 PY0 去反推），否則之後如果又調整高原南緣（拉長懸崖），
# PY0 一變動，平原深度就會跟著錯誤地內縮，導致柱體被擠到平原範圍外面（先前發生過的 bug）。
PLAIN_DEPTH_BASE = 227.0   # 原始（縮放前）平原深度基準：舊版 PY0(60) 到 SY0_PDF(-167) 的距離
SY0 = PY0 - PLAIN_DEPTH_BASE * SOUTH_SCALE
add_box("平原_東側帶", PX1, SY0, SX1, SY1, -SLAB_T, 0, "surface_plain", colls["平原"])
add_box("平原_南側塊", SX0, SY0, PX1, PY0, -SLAB_T, 0, "surface_plain", colls["平原"])

# 高原 ↔ 平原：南邊界與東邊界的斜坡（約 85°）
run_plateau = run_for(PLATEAU_TOP, SLOPE_PLATEAU_DEG)
add_ramp_ns("高原轉平原_南坡", PX0, PX1, PY0, zt, PY0 - run_plateau, 0, "surface_plateau", colls["高原"])
add_ramp_ew("高原轉平原_東坡", PY0, PY1, PX1, zt, PX1 + run_plateau, 0, "surface_plateau", colls["高原"])

# ── 指北標示：平原南側塊的西南角，離導師之塔與高原都有大段留白，不會被其他物件擋到 ──
compass_x, compass_y = SX0 + 60 * SCALE, SY0 + 60 * SCALE
compass_tip = (compass_x, compass_y + 25 * SCALE, 0)
compass_base_l = (compass_x - 15 * SCALE, compass_y - 25 * SCALE, 0)
compass_base_r = (compass_x + 15 * SCALE, compass_y - 25 * SCALE, 0)
add_wedge("指北標示_箭頭", [
    compass_tip, compass_base_l, compass_base_r,
    (compass_tip[0], compass_tip[1], TILE_T),
    (compass_base_l[0], compass_base_l[1], TILE_T),
    (compass_base_r[0], compass_base_r[1], TILE_T),
], "compass", colls["標記與標籤"])
add_label("N", compass_x, compass_tip[1] + 18 * SCALE, TILE_T + 0.3, 18 * SCALE,
          colls["標記與標籤"], mat_key="compass")

# ── 地面：無實體表面（純視覺、只有貼圖沒有碰撞，高度比平原低）──────
# 對照 PDF 精確量測：無實體只存在於固體地面「西、東」兩側，南北方向幾乎沒有
# 額外留白（外框虛線在南北與實體邊界是同一條線）。因此無實體畫成包住西/東側、
# 南北僅留極窄收邊的「畫框」，而不是四周等寬的大範圍。
# 顏色跟高原/平原同一個草地色系，但用單面平面（無厚度、無側壁）表現「只是貼圖」的性質。
VOID_MARGIN_WEST = 218.0   # 西側無實體寬度（依 PDF 量測）
VOID_MARGIN_EAST = 205.0   # 東側無實體寬度（依 PDF 量測）
VOID_MARGIN_NORTH = 15.0   # 北側無實體留白（PDF 顯示幾乎沒有，只留極窄收邊；不受南側縮放影響）
VOID_MARGIN_SOUTH = 15.0 * SOUTH_SCALE  # 南側無實體留白，跟著南側整體放大倍率一起變寬
VOID_DROP = 22.0           # 比平原表面（z=0）低多少
void_x0 = SX0 - VOID_MARGIN_WEST
void_x1 = SX1 + VOID_MARGIN_EAST
void_y0 = SY0 - VOID_MARGIN_SOUTH
void_y1 = SY1 + VOID_MARGIN_NORTH
void_z = -VOID_DROP
add_plane("無實體_西側", void_x0, void_y0, SX0, void_y1, void_z, "surface_void", colls["無實體"])
add_plane("無實體_東側", SX1, void_y0, void_x1, void_y1, void_z, "surface_void", colls["無實體"])
add_plane("無實體_北側", SX0, SY1, SX1, void_y1, void_z, "surface_void", colls["無實體"])
add_plane("無實體_南側", SX0, void_y0, SX1, SY0, void_z, "surface_void", colls["無實體"])

# 高原 ↔ 無實體：西側與北側斜坡（約 85°，比照南/東側，高原這兩側直接鄰接無實體、沒有平原）
run_plateau_void = run_for(zt - void_z, SLOPE_PLATEAU_DEG)
add_ramp_ew("高原轉無實體_西坡", PY0, PY1, PX0, zt, PX0 - run_plateau_void, void_z, "surface_plateau", colls["高原"])
add_ramp_ns("高原轉無實體_北坡", PX0, PX1, PY1, zt, PY1 + run_plateau_void, void_z, "surface_plateau", colls["高原"])

# ── 地面：海（無實體再往外，純視覺背景，遊戲中會直接穿過去）──────────
SEA_MARGIN = 300.0    # 海面往外延伸的寬度；不宜過大，否則整體包圍盒會暴增，
                      # 導致網頁 <model-viewer> 的自動置中/縮放算壞（模型變成載入完成但不可見）
sea_x0, sea_y0 = void_x0 - SEA_MARGIN, void_y0 - SEA_MARGIN
sea_x1, sea_y1 = void_x1 + SEA_MARGIN, void_y1 + SEA_MARGIN
add_plane("海", sea_x0, sea_y0, sea_x1, sea_y1, void_z - 4.0, "surface_sea", colls["無實體"])

# ── 試煉房地磚 ────────────────────────────────────────────
# 依空拍圖參考（tots_關卡空拍配置.png）：房間彼此都是「軸對齊」的方／長方形，不會旋轉；
# 只是水平、垂直方向沒有精準對齊在同一條網格線上。這裡只加小幅位置偏移與等比例縮放
# （x、y 同步縮放，不會把正方形房間拉成不合理的長條），角度維持 0。
layout_json = {"rooms": [], "circles": [], "master_sword_room": {}, "surfaces": {}}
for label, attr, cx_px, cy_px, size_x0, size_y0, is_start, in_basin in ROOMS:
    cx0, cy0 = W(cx_px, cy_px)
    jitter_x = rng.uniform(-4.0, 4.0) * SCALE
    jitter_y = rng.uniform(-4.0, 4.0) * SCALE
    uni_scale = rng.uniform(0.92, 1.12)
    cx, cy = cx0 + jitter_x, cy0 + jitter_y
    size_x = size_x0 * SCALE * uni_scale
    size_y = size_y0 * SCALE * uni_scale
    # 房間本身一律跟其他樓層同高（zt），凹陷盆地只是底下的地形（洞），
    # 中級1-4F/12-16F 是懸浮在盆地上方的平台，不會跟著沉到盆地底部。
    base_z = zt
    # 方塊型試煉房（非黑暗屬性半球體）整體縮小 BOX_SHRINK 倍，中心點（cx, cy）與樓面
    # 高度（zt）不變，長寬高等比例縮小；dark 屬性的球體footprint 仍用未縮小的 size_x/size_y。
    box_size_x = size_x * BOX_SHRINK
    box_size_y = size_y * BOX_SHRINK
    box_h = BOX_ROOM_H * BOX_SHRINK
    if is_start:
        add_box(f"{label}_起點框", cx - box_size_x * 0.59, cy - box_size_y * 0.59,
                cx + box_size_x * 0.59, cy + box_size_y * 0.59,
                base_z, base_z + box_h * 0.12, "start", colls["試煉房"])
        base_z += box_h * 0.12

    if attr == "dark":
        # 黑暗屬性（中級6-10F）是圓形房間，立體模型用半球體：完整球體球心對齊 base_z
        # （赤道＝地面），上半部露出來當圓頂，下半部埋進地底，跟導師之間圓頂座同一招。
        dome_r = (size_x + size_y) / 4
        bpy.ops.mesh.primitive_uv_sphere_add(radius=dome_r, location=(cx, cy, base_z),
                                             segments=32, ring_count=16)
        dome_obj = bpy.context.active_object
        dome_obj.name = label
        if DARK_DOME_H_RATIO != 1.0:
            dome_obj.scale.z = DARK_DOME_H_RATIO
            bpy.ops.object.transform_apply(scale=True)
        dome_obj.data.materials.append(get_mat(attr))
        link_to(dome_obj, colls["試煉房"])
        top_z = base_z + dome_r * DARK_DOME_H_RATIO
    else:
        add_box(label, cx - box_size_x / 2, cy - box_size_y / 2,
                cx + box_size_x / 2, cy + box_size_y / 2,
                base_z, base_z + box_h, attr, colls["試煉房"])
        top_z = base_z + box_h

    add_label(label, cx, cy, top_z + 0.15, LABEL_SIZE * SCALE,
              colls["標記與標籤"],
              mat_key="text_light" if attr in DARK_TILES else "text")
    layout_json["rooms"].append({
        "label": label, "attr": attr, "x": round(cx, 1), "y": round(cy, 1),
        "z": round(base_z, 1),
        "size_x": round(size_x if attr == "dark" else box_size_x, 1),
        "size_y": round(size_y if attr == "dark" else box_size_y, 1),
        "start": is_start, "in_basin": in_basin,
    })

# ── 休息房／綠洲／盆地（高原上的圓）────────────────────────
for label, kind, cx_px, cy_px, r in CIRCLES:
    cx0, cy0 = W(cx_px, cy_px)
    cx = cx0 + rng.uniform(-3.0, 3.0) * SCALE
    cy = cy0 + rng.uniform(-3.0, 3.0) * SCALE
    r_j = r * SCALE * rng.uniform(0.94, 1.08)
    add_cyl(f"{label}_{round(cx)}", cx, cy, r_j, zt, zt + TILE_T, kind, colls["休息與地形"])
    add_label(label, cx, cy, zt + TILE_T + 0.15, LABEL_SIZE * 0.85 * SCALE,
              colls["標記與標籤"])
    layout_json["circles"].append({
        "label": label, "kind": kind, "x": round(cx, 1), "y": round(cy, 1), "r": round(r_j, 1),
    })

# ── 導師之間（塔底盆地＋酒瓶狀塔身：圓頂→直筒柱身→肩部收頸→窄瓶頸）──────
# 盆地是平原與塔底之間的斜坡凹陷（約 70°）：
# 開口（rim，與平原同高 z=0）較寬，往下收窄到 floor_z 的盆底，塔身立在盆底上。
# X 對齊頂級21F（COLS5[2]）正下方（不受南側縮放影響）；
# Y 用「距高原南緣的距離 x SOUTH_SCALE」計算，柱體變大後平原南側也跟著放大才裝得下。
mx = (COLS5[2] - ORIGIN_PX[0]) * SCALE
MS_OFFSET_SOUTH_BASE = 100.0   # 原始（縮放前）柱體中心距高原南緣的距離
my = PY0 - MS_OFFSET_SOUTH_BASE * SOUTH_SCALE

ms_floor_z = -MS_BASIN_DEPTH
run_ms = run_for(MS_BASIN_DEPTH, SLOPE_MS_DEG)
ms_rim_r = (MS_BASIN_R + run_ms) * SCALE
bpy.ops.mesh.primitive_cone_add(
    vertices=64, radius1=MS_BASIN_R * SCALE, radius2=ms_rim_r,
    depth=MS_BASIN_DEPTH * SCALE, location=(mx, my, ms_floor_z / 2),
)
basin = bpy.context.active_object
basin.name = "導師之間_塔底盆地"
basin.data.materials.append(get_mat("ms_basin"))
link_to(basin, colls["導師之間"])

# 底部圓頂（酒瓶底，一半embedded在盆底裡）
bpy.ops.mesh.primitive_uv_sphere_add(radius=TOWER_BODY_R * SCALE,
                                     location=(mx, my, ms_floor_z),
                                     segments=48, ring_count=24)
dome = bpy.context.active_object
dome.name = "導師之間_圓頂座"
dome.scale.z = TOWER_DOME_H / TOWER_BODY_R
bpy.ops.object.transform_apply(scale=True)
dome.data.materials.append(get_mat("tower"))
link_to(dome, colls["導師之間"])

# 直筒柱身（與圓頂重疊一小段接合）
cyl_bottom = ms_floor_z + TOWER_DOME_H * 0.6
cyl_top = cyl_bottom + TOWER_CYL_H
add_cyl("導師之間_柱身", mx, my, TOWER_BODY_R * SCALE, cyl_bottom, cyl_top,
        "tower", colls["導師之間"], verts=48)

# 肩部收頸（柱身→瓶頸的過渡段，改用球面而非直線斜面，外觀是平滑外凸的圓弧）：
# 一顆半徑＝柱身半徑的完整球體，球心對齊在柱身頂端（赤道處＝柱身寬度），球面上半部
# 自然平滑收窄；下半部會嵌進柱身內部（跟底部圓頂的做法一樣），沒有露出來所以無妨。
# 收窄到瓶頸半徑的高度用畢氏定理算：body_r² = neck_join_h² + neck_r²
neck_join_h = sqrt(TOWER_BODY_R ** 2 - TOWER_NECK_R ** 2)
taper_top = cyl_top + neck_join_h
bpy.ops.mesh.primitive_uv_sphere_add(radius=TOWER_BODY_R * SCALE,
                                     location=(mx, my, cyl_top),
                                     segments=48, ring_count=24)
taper = bpy.context.active_object
taper.name = "導師之間_肩部收頸"
taper.data.materials.append(get_mat("tower"))
link_to(taper, colls["導師之間"])

# 瓶頸（頂端窄柱，短短地往上延伸）
neck_top = taper_top + TOWER_NECK_H
add_cyl("導師之間_瓶頸", mx, my, TOWER_NECK_R * SCALE, taper_top, neck_top,
        "tower", colls["導師之間"], verts=32)

layout_json["master_sword_room"] = {
    "x": round(mx, 1), "y": round(my, 1),
    "body_r": TOWER_BODY_R, "dome_h": TOWER_DOME_H, "cyl_h": TOWER_CYL_H,
    "taper_h": round(neck_join_h, 1), "neck_r": TOWER_NECK_R, "neck_h": TOWER_NECK_H,
    "total_height_to_taper": round(TOWER_DOME_H + TOWER_CYL_H, 1),
    "basin_floor_r": MS_BASIN_R, "basin_rim_r": round(ms_rim_r, 1),
    "basin_floor_z": ms_floor_z, "basin_slope_deg": SLOPE_MS_DEG,
}

layout_json["surfaces"] = {
    "plateau": {"x0": round(PX0, 1), "y0": round(PY0, 1), "x1": round(PX1, 1),
                "y1": round(PY1, 1), "top_z": zt,
                "slope_to_plain_deg": SLOPE_PLATEAU_DEG},
    "plain_east": {"x0": round(PX1, 1), "y0": round(SY0, 1), "x1": round(SX1, 1),
                   "y1": round(SY1, 1), "top_z": 0},
    "plain_south": {"x0": round(SX0, 1), "y0": round(SY0, 1), "x1": round(PX1, 1),
                    "y1": round(PY0, 1), "top_z": 0},
    "sunken_basin": {"x0": round(BX0, 1), "y0": round(BY0, 1), "x1": round(BX1, 1),
                     "y1": round(BY1, 1), "floor_z": zb, "depth": BASIN_DEPTH,
                     "slope_deg": SLOPE_BASIN_DEG},
    "void": {"outer_x0": round(void_x0, 1), "outer_y0": round(void_y0, 1),
             "outer_x1": round(void_x1, 1), "outer_y1": round(void_y1, 1),
             "solid_x0": round(SX0, 1), "solid_y0": round(SY0, 1),
             "solid_x1": round(SX1, 1), "solid_y1": round(SY1, 1),
             "top_z": -VOID_DROP},
}

# ── 燈光、攝影機、輸出 ─────────────────────────────────────
out_dir = os.path.dirname(os.path.abspath(__file__))

bpy.ops.object.light_add(type="SUN", location=(0, 0, 300))
sun = bpy.context.active_object
sun.data.energy = 4.0
sun.rotation_euler = (radians(8), radians(-8), 0)

world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get("Background")
bg.inputs[0].default_value = (1, 1, 1, 1)
bg.inputs[1].default_value = 1.0

# 場景中心（涵蓋固體區＋周圍無實體區）
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

for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE", "BLENDER_WORKBENCH"):
    try:
        scene.render.engine = eng
        break
    except TypeError:
        continue

render_to(os.path.join(out_dir, "render_top.png"),
          (center.x, center.y, 900), ortho=True, ortho_scale=extent * 1.15)
iso_k = extent / 722.0   # 依場景範圍縮放斜視攝影機距離（722 為原始固體區尺寸基準）
render_to(os.path.join(out_dir, "render_iso.png"),
          (center.x + 620 * iso_k, center.y - 700 * iso_k, 520 * iso_k))

with open(os.path.join(out_dir, "tots_layout.json"), "w", encoding="utf-8") as f:
    json.dump(layout_json, f, ensure_ascii=False, indent=2)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out_dir, "tots-model.blend"))
bpy.ops.export_scene.gltf(filepath=os.path.join(out_dir, "tots-model.glb"),
                          export_format="GLB")
print("=== ToTS 模型生成完成 ===")

