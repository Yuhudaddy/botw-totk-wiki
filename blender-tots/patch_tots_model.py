# -*- coding: utf-8 -*-
"""
劍之考驗參照模型 — 地形修正腳本（Phase 2 / patch）
================================================
承接 enhance_tots_model.py 的輸出（tots-model.blend，已含 Phase 1 視覺強化），
修正兩個地形問題與統一平原色調，皆為地形幾何／材質層級的修正，不重跑生成腳本
（會蓋掉所有手動調整）：

  A. 中級盆地斜坡貼合高原面：斜坡的實際稜線（80°、深度18 對應的水平投影 run_old）
     比「高原面_北/南/西/東」四片板的內緣還要外推約 2.12 個單位，導致斜坡頂端
     穿進高原面板內部（視覺上像插進高原裡）。修法：四片板的內緣頂點直接外推到
     斜坡實際稜線位置；西/東兩片同時擴大 Y 範圍蓋住四個轉角（否則轉角會露出
     約 2×2 的破洞）。斜坡本身（凹陷盆地_底／北坡／南坡／東坡／西坡）完全不動。

  B. 導師之間塔底盆地改為真正下凹地形：原本的「盆地」其實是一顆貼平原表面
     （z=0）的實心圓台，跟平原完全共面，Phase 1 的 z 下沉 0.06 只是消除
     z-fighting 閃爍，不是真的凹陷——這正是「盆地消失」的成因（下沉後整顆
     沒入平原板底下）。這裡改成貨真價實的下凹：
       - 平原_南側塊挖一個真圓洞（布林差集，半徑＝深灰地板環外緣）
       - 洞內由外而內：深灰色平地環（與平原同高 z=0）→ 60° 斜坡 → 盆地底 z=-64
       - 塔身向下加長：柱身下緣延伸 56（銜接新深度的盆地底），柱身上緣／收頸／
         瓶頸維持原絕對高度，塔頂輪廓從平原看完全不變

  C. 顏色統一：平原本體（surface_plain）與導師之間盆地（ms_basin）都改成
     #3ecf72，兩者跟著同一個「平原區」的顏色。深灰色平地環是新材質
     （ms_basin_ring，#4a4a48），不受這次變色影響。高原與高原自己的中級盆地
     （surface_plateau／surface_basin）不動。

用法（無頭執行，從 blender-tots/ 資料夾，讀取 enhance 腳本的輸出）：
  /Applications/Blender.app/Contents/MacOS/Blender -b tots-model.blend \
      -P patch_tots_model.py -- <輸出資料夾>

輸出：<輸出資料夾>/tots-model.blend、tots-model.glb、render_top.png、
      render_iso.png、tots-layout.json（座標表，格式與 enhance 腳本相同）

※ 本腳本操作的物件名稱／位置皆與目前 tots-model.blend 的實際狀態核對過（用
  inspect_current.py 直接讀取 .blend 內物件的實際世界座標，非直接信任生成腳本
  常數），只能對「這一版」的 .blend 執行一次；重複執行會用「已經被移動過」的
  新位置再套一次偏移量／布林差集，不是冪等操作。
"""
import bpy
import bmesh
import json
import sys
import os
import math
from math import radians, tan
from mathutils import Vector, noise as bnoise

argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT_DIR = os.path.abspath(argv[0]) if argv else os.path.dirname(os.path.abspath(__file__))

# ── 共用工具（與 enhance_tots_model.py 同名函式邏輯一致，本腳本獨立可執行）──
def hex_rgba(h, a=1.0):
    h = h.lstrip("#")
    s = [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in s]
    return (*lin, a)

def run_for(depth, angle_deg):
    return depth / tan(radians(angle_deg))

def world_bbox(o):
    cs = [o.matrix_world @ Vector(c) for c in o.bound_box]
    xs = [c.x for c in cs]; ys = [c.y for c in cs]; zs = [c.z for c in cs]
    return min(xs), min(ys), min(zs), max(xs), max(ys), max(zs)

def select_only(obj):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj

def shade_smooth_by_angle(obj, angle_deg=40.0):
    select_only(obj)
    try:
        bpy.ops.object.shade_smooth_by_angle(angle=radians(angle_deg))
    except AttributeError:
        bpy.ops.object.shade_smooth()

def link_to(obj, coll):
    for c in obj.users_collection:
        c.objects.unlink(obj)
    coll.objects.link(obj)

print(f"=== Phase 2 地形修正開始，輸出到 {OUT_DIR} ===")
colls = {c.name: c for c in bpy.data.collections}

# ── A. 中級盆地斜坡貼合高原面 ──────────────────────────────
BASIN_X0, BASIN_X1 = -557.0, -297.0   # 盆地原始開口邊界（世界座標，取自現有斜坡物件實測值）
BASIN_Y0, BASIN_Y1 = 355.0, 439.0
RUN_OLD = run_for(12.0, 80.0)          # 舊深度12、80°的水平投影＝斜坡稜線相對開口邊界的外推量

NEW_INNER_Y0 = BASIN_Y1 + RUN_OLD      # 高原面_北 的南側（內側）邊界新位置
NEW_INNER_Y1 = BASIN_Y0 - RUN_OLD      # 高原面_南 的北側（內側）邊界新位置
NEW_INNER_X1 = BASIN_X0 - RUN_OLD      # 高原面_西 的東側（內側）邊界新位置
NEW_INNER_X0 = BASIN_X1 + RUN_OLD      # 高原面_東 的西側（內側）邊界新位置
PX0, PX1 = -645.0, -120.0              # 高原整體 X 範圍（四片板共用的外緣，不變）
PY0, PY1 = -59.0, 540.0                # 高原整體 Y 範圍（南／北片的外緣，不變）

def resize_box_xy(name, new_x0, new_y0, new_x1, new_y1):
    """依「最接近的舊邊界」重新分配每個頂點的世界 X/Y（Z 不動）。物件須為簡單長方體
    （8 頂點、無旋轉）；用世界座標比對，location 是否為零皆可正確處理。"""
    o = bpy.data.objects[name]
    ox0, oy0, oz0, ox1, oy1, oz1 = world_bbox(o)
    loc = o.location
    for v in o.data.vertices:
        wx, wy = v.co.x + loc.x, v.co.y + loc.y
        nx = new_x0 if abs(wx - ox0) < abs(wx - ox1) else new_x1
        ny = new_y0 if abs(wy - oy0) < abs(wy - oy1) else new_y1
        v.co.x, v.co.y = nx - loc.x, ny - loc.y
    o.data.update()
    print(f"  {name}: X[{ox0:.1f},{ox1:.1f}]→[{new_x0:.1f},{new_x1:.1f}]  "
          f"Y[{oy0:.1f},{oy1:.1f}]→[{new_y0:.1f},{new_y1:.1f}]")

resize_box_xy("高原面_北", PX0, NEW_INNER_Y0, PX1, PY1)
resize_box_xy("高原面_南", PX0, PY0, PX1, NEW_INNER_Y1)
resize_box_xy("高原面_西", PX0, NEW_INNER_Y1, NEW_INNER_X1, NEW_INNER_Y0)
resize_box_xy("高原面_東", NEW_INNER_X0, NEW_INNER_Y1, PX1, NEW_INNER_Y0)
print(f"A. 高原面四片板內緣外推 {RUN_OLD:.2f} 個單位，貼合斜坡實際稜線，轉角同步補齊完成")

# ── B. 導師之間塔底盆地：改為真正下凹地形 ──────────────────
mx, my = -422.0, -309.0                # 塔中心（世界座標，取自「導師之間_柱身」實測位置）
OLD_MS_DEPTH = 8.0
NEW_MS_DEPTH = 64.0                    # 高原到平原高低差(80)的 80%
NEW_MS_SLOPE_DEG = 60.0
MS_FLOOR_R = 90.0                      # 盆地底半徑（參考圖綠圈）
MS_RING_OUTER_R = 140.0                # 深灰地板環外緣半徑（參考圖紅圈）
ms_run_new = run_for(NEW_MS_DEPTH, NEW_MS_SLOPE_DEG)
ms_opening_r = MS_FLOOR_R + ms_run_new       # 斜坡頂／地板環內緣，約 126.95
DEPTH_DELTA = NEW_MS_DEPTH - OLD_MS_DEPTH    # 56

# B-1. 刪除舊的（其實貼平面共面的）塔底盆地
old_basin = bpy.data.objects.get("導師之間_塔底盆地")
if old_basin:
    old_mesh = old_basin.data
    bpy.data.objects.remove(old_basin, do_unlink=True)
    bpy.data.meshes.remove(old_mesh, do_unlink=True)

# B-2. 平原_南側塊挖圓洞（布林差集）
plain_south = bpy.data.objects["平原_南側塊"]
bpy.ops.mesh.primitive_cylinder_add(vertices=64, radius=MS_RING_OUTER_R,
                                    depth=4.0, location=(mx, my, -1.0))
cutter = bpy.context.active_object
mod = plain_south.modifiers.new("MSBasinCut", "BOOLEAN")
mod.operation = "DIFFERENCE"
mod.object = cutter
try:
    mod.solver = "EXACT"
except TypeError:
    pass
select_only(plain_south)
bpy.ops.object.modifier_apply(modifier=mod.name)
bpy.data.objects.remove(cutter, do_unlink=True)
print(f"B-2. 平原_南側塊挖洞完成（半徑 {MS_RING_OUTER_R}）")

# B-3. 新盆地底（下凹圓台：底 r={MS_FLOOR_R}/z=-64，開口 r≈{ms_opening_r:.1f}/z=0）
ms_basin_mat = bpy.data.materials["ToTS_ms_basin"]
bpy.ops.mesh.primitive_cone_add(
    vertices=64, radius1=MS_FLOOR_R, radius2=ms_opening_r,
    depth=NEW_MS_DEPTH, location=(mx, my, -NEW_MS_DEPTH / 2),
)
pit = bpy.context.active_object
pit.name = "導師之間_塔底盆地"
pit.data.materials.append(ms_basin_mat)
link_to(pit, colls["導師之間"])
shade_smooth_by_angle(pit, 30)
print(f"B-3. 新盆地底建立完成：底半徑{MS_FLOOR_R}、開口半徑{ms_opening_r:.1f}、"
      f"深度{NEW_MS_DEPTH}、坡度{NEW_MS_SLOPE_DEG}°")

# B-4. 深灰色平地環（開口 r≈126.95 ～ 外緣 r=140，與平原同高 z=0 的扁平圓環）
ring_mat = bpy.data.materials.get("ToTS_ms_basin_ring")
if not ring_mat:
    ring_mat = bpy.data.materials.new("ToTS_ms_basin_ring")
    ring_mat.use_nodes = True
    rb = ring_mat.node_tree.nodes["Principled BSDF"]
    rb.inputs["Base Color"].default_value = hex_rgba("#4a4a48")
    rb.inputs["Roughness"].default_value = 0.85

def make_flat_ring(name, cx, cy, z, r_in, r_out, mat, coll, verts=64):
    bm = bmesh.new()
    inner = [bm.verts.new((cx + r_in * math.cos(2 * math.pi * i / verts),
                            cy + r_in * math.sin(2 * math.pi * i / verts), z))
             for i in range(verts)]
    outer = [bm.verts.new((cx + r_out * math.cos(2 * math.pi * i / verts),
                            cy + r_out * math.sin(2 * math.pi * i / verts), z))
             for i in range(verts)]
    for i in range(verts):
        j = (i + 1) % verts
        bm.faces.new((inner[i], inner[j], outer[j], outer[i]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    if bm.faces and bm.faces[0].normal.z < 0:
        bmesh.ops.reverse_faces(bm, faces=bm.faces)
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    o = bpy.data.objects.new(name, mesh)
    o.data.materials.append(mat)
    coll.objects.link(o)
    return o

make_flat_ring("導師之間_塔底盆地_外環", mx, my, 0.0, ms_opening_r, MS_RING_OUTER_R,
               ring_mat, colls["導師之間"])
print(f"B-4. 深灰色平地環建立完成：內緣{ms_opening_r:.1f}～外緣{MS_RING_OUTER_R}")

# B-5. 塔身跟著下沉：柱身下緣延伸56、圓頂座整體下移56；上緣/收頸/瓶頸維持原絕對高度
dome = bpy.data.objects["導師之間_圓頂座"]
for v in dome.data.vertices:
    v.co.z -= DEPTH_DELTA
dome.data.update()

body = bpy.data.objects["導師之間_柱身"]
for v in body.data.vertices:
    if v.co.z < 0:      # 局部座標原點在柱身中心，下緣頂點局部 z<0
        v.co.z -= DEPTH_DELTA
body.data.update()
print(f"B-5. 圓頂座整體下移 {DEPTH_DELTA}，柱身下緣延伸 {DEPTH_DELTA}（上緣/收頸/瓶頸不動）")

# ── C. 顏色統一：平原本體與導師之間盆地都改成 #3ecf72 ──────────
NEW_PLAIN_COLOR = hex_rgba("#3ecf72")

plain_mat = bpy.data.materials["ToTS_surface_plain"]
plain_mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = NEW_PLAIN_COLOR

# surface_plain 是「草地雜訊貼圖」材質，實際顏色來自 grass_surface_plain 這張圖片的
# 像素資料（貼圖節點直接接到 Base Color，蓋過上面這行的輸入值），必須重新產生同一張
# 圖片的像素才會真的變色（沿用 Phase 1 對 grass_surface_void 的做法）。
plain_img = bpy.data.images.get("grass_surface_plain")
if plain_img:
    w, h = plain_img.size
    r, g, b, _a = NEW_PLAIN_COLOR
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
    plain_img.pixels[:] = pixels
    plain_img.pack()
    print("C. surface_plain 貼圖顏色已改為 #3ecf72")

ms_basin_mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = NEW_PLAIN_COLOR
print("C. ms_basin 顏色已改為 #3ecf72（跟隨平原色）")

# ── 點擊互動用座標表（與 enhance 腳本輸出格式一致；本次改動不影響房間／地標的
#    可點擊區域，重新輸出只是為了保持與目前 .blend 同步）──────────────────
ATTR_LABELS = {
    "normal": "一般房間", "water": "水域", "void": "奈落",
    "dark": "黑暗", "storm": "雷雨", "volcano": "火山", "frigid": "寒冷",
    "rest": "休息平台", "oasis": "綠洲", "basin": "盆地地標",
}
room_coll = colls["試煉房"]
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
        continue
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

# ── 驗證渲染（與 enhance 腳本同參數）──────────────────────────
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

# 額外近景渲染：導師之間盆地特寫，方便比對參考空拍圖
ms_center = Vector((mx, my, 0))
def render_close(path, cam_loc, target):
    bpy.ops.object.camera_add(location=cam_loc)
    cam = bpy.context.active_object
    direction = target - Vector(cam_loc)
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    cam.data.clip_end = 5000
    scene.camera = cam
    scene.render.filepath = path
    scene.render.resolution_x = 1400
    scene.render.resolution_y = 1400
    bpy.ops.render.render(write_still=True)

render_close(os.path.join(OUT_DIR, "render_ms_basin.png"),
             (mx + 30, my - 260, 260), ms_center)
render_close(os.path.join(OUT_DIR, "render_basin_slope.png"),
             (-427, 390, 220), Vector((-427, 400, 70)))

print("=== Phase 2 地形修正完成 ===")
