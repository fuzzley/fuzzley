"""Generate the fuzzley favicon set.

The mark is the letter f built from four bento tiles: a stem, a crossbar
stub on each side, and a green hook. Every coordinate sits on even units of a
32-unit grid, so at 16px each edge lands on a whole pixel.

Requires Pillow. Usage: python make_favicons.py <out_dir>
"""

import io
import json
import struct
import sys
from pathlib import Path

from PIL import Image, ImageDraw

INK = "#14171B"
PORCELAIN = "#E9ECEF"
GREEN = "#179A50"

# (x, y, w, h, role) on a 32-unit grid. The stem starts below the hook's top
# edge so the hook rises over it, which is what makes this read as a
# lowercase f rather than a capital F.
TILES = [
    (2, 12, 6, 6, "ink"),     # crossbar, left of the stem
    (10, 8, 6, 22, "ink"),    # stem
    (18, 2, 10, 8, "green"),  # hook
    (18, 12, 8, 6, "ink"),    # crossbar, right of the stem
]
RADIUS = 1.5


def svg_adaptive():
    """icon.svg: ink tiles on light browser chrome, porcelain on dark."""
    rects = "\n".join(
        f'  <rect class="{role}" x="{x}" y="{y}" width="{w}" height="{h}" rx="{RADIUS}"/>'
        for x, y, w, h, role in TILES
    )
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .ink {{ fill: {INK}; }}
    .green {{ fill: {GREEN}; }}
    @media (prefers-color-scheme: dark) {{ .ink {{ fill: {PORCELAIN}; }} }}
  </style>
{rects}
</svg>
"""


def render(size, background=None, scale_of_canvas=1.0, radius=RADIUS):
    """Draw the mark at `size` px. With a background, the mark fills
    `scale_of_canvas` of the canvas, centered."""
    ss = 16  # supersampling factor; BOX downsampling keeps pixel edges exact
    big = size * ss
    img = Image.new("RGBA", (big, big), background or (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    mark = big * scale_of_canvas
    offset = (big - mark) / 2
    unit = mark / 32
    colors = {"ink": INK, "green": GREEN}
    for x, y, w, h, role in TILES:
        x0 = offset + x * unit
        y0 = offset + y * unit
        draw.rounded_rectangle(
            (x0, y0, x0 + w * unit - 1, y0 + h * unit - 1),
            radius=radius * unit,
            fill=colors[role],
        )
    return img.resize((size, size), Image.BOX)


def write_ico(path, images):
    """ICO with PNG-encoded entries, one per size."""
    blobs = []
    for im in images:
        buf = io.BytesIO()
        im.save(buf, "PNG", optimize=True)
        blobs.append(buf.getvalue())
    header = struct.pack("<HHH", 0, 1, len(images))
    offset = 6 + 16 * len(images)
    entries = b""
    for im, blob in zip(images, blobs):
        w, h = im.size
        entries += struct.pack(
            "<BBBBHHII", w % 256, h % 256, 0, 0, 1, 32, len(blob), offset
        )
        offset += len(blob)
    Path(path).write_bytes(header + entries + b"".join(blobs))


def main(out):
    out = Path(out)
    out.mkdir(parents=True, exist_ok=True)

    (out / "icon.svg").write_text(svg_adaptive(), encoding="utf-8")

    # Tab icons: transparent, light-theme colors. At 16px the corners are
    # squared off; a 0.75px radius only blurs them.
    ico_sizes = [render(16, radius=0), render(32), render(48)]
    write_ico(out / "favicon.ico", ico_sizes)

    # Home-screen and install icons: opaque porcelain square. At 0.6 of the
    # canvas the mark's farthest corner sits inside the maskable safe zone
    # (a circle 80% of the icon's width); iOS only rounds the corners, so the
    # touch icon can run a little larger.
    render(180, background=PORCELAIN, scale_of_canvas=0.66).save(
        out / "apple-touch-icon.png", optimize=True
    )
    for size in (192, 512):
        render(size, background=PORCELAIN, scale_of_canvas=0.6).save(
            out / f"icon-{size}.png", optimize=True
        )

    manifest = {
        "name": "Andrey Gavel",
        "short_name": "fuzzley",
        "icons": [
            {"src": "icon-192.png", "type": "image/png", "sizes": "192x192"},
            {"src": "icon-512.png", "type": "image/png", "sizes": "512x512"},
            {"src": "icon-512.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable"},
        ],
        "theme_color": PORCELAIN,
        "background_color": PORCELAIN,
    }
    (out / "manifest.webmanifest").write_text(
        json.dumps(manifest, indent=2) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main(sys.argv[1])
