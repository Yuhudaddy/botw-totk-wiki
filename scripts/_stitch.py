#!/usr/bin/env python3
# 由 fetch-flowmap-basemap.mjs 呼叫：把資料夾內 {x}_{y}.webp 的圖磚拼成一張大圖。
# 缺磚（沒下載到）補透明，不留黑洞。
import sys
from pathlib import Path
from PIL import Image

tile_dir, cols, rows, tile_size, out_path = sys.argv[1:6]
cols, rows, tile_size = int(cols), int(rows), int(tile_size)

canvas = Image.new("RGBA", (cols * tile_size, rows * tile_size), (0, 0, 0, 0))
tile_dir = Path(tile_dir)
missing = 0
for y in range(rows):
    for x in range(cols):
        p = tile_dir / f"{x}_{y}.webp"
        if p.exists():
            tile = Image.open(p).convert("RGBA")
            canvas.paste(tile, (x * tile_size, y * tile_size))
        else:
            missing += 1

Path(out_path).parent.mkdir(parents=True, exist_ok=True)
canvas.save(out_path, "WEBP", quality=82, method=6)
print(f"  拼接完成：{cols * tile_size}x{rows * tile_size}px，缺 {missing}/{cols * rows} 塊")
