"""Generate the fuzzley favicon set.

The mark is a fuzzball: a felt-green pom-pom with a tuft on top and two eyes
glancing right. The fur is a ring of short strands around a disc, each
curling clockwise like brushed fur. Their lengths are jittered from a fixed
seed, so every run draws the same ball.

Requires Pillow. Usage: python make_favicons.py <out_dir>
"""

import io
import json
import math
import random
import struct
import sys
from pathlib import Path

from PIL import Image, ImageDraw

INK = "#14171B"
PORCELAIN = "#E9ECEF"
GREEN = "#179A50"
GREEN_DARK = "#3CC277"  # the site's --green in dark mode
WHITE = "#FFFFFF"

# On a 32-unit grid. The ball sits a little low to leave room for the tuft.
CX, CY = 16, 17.2
BODY_R = 10.4
FUR_WIDTH = 2.8
EYES = [(13.4, 17, 2.3, 3), (20.6, 17, 2.3, 3)]  # cx, cy, rx, ry
GLINTS = [(14.2, 15.8, 0.85), (21.4, 15.8, 0.85)]  # cx, cy, r


def strands():
    """The fur: 30 quadratic curves, (start, control, end), from inside the
    disc outward. The ones nearest the top run longer, which is the tuft."""
    rng = random.Random(11)
    count, r0, curl = 30, 8.2, 0.2

    def polar(r, a):
        return (CX + r * math.cos(a), CY + r * math.sin(a))

    out = []
    for i in range(count):
        a = 2 * math.pi * i / count + rng.uniform(-0.06, 0.06)
        r1 = 11.6 + rng.uniform(-0.5, 0.5)
        from_top = abs(math.atan2(math.sin(a + math.pi / 2), math.cos(a + math.pi / 2)))
        r1 += max(0.0, 2.2 * (1 - from_top / 0.5))
        rc = (r0 + r1) / 2
        out.append((polar(r0, a), polar(rc, a + curl * 0.1), polar(r1, a + curl)))
    return out


def n(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def svg_adaptive():
    """icon.svg: felt green, switching to the site's brighter dark-mode green
    on dark browser chrome. The eyes sit on the green, so they stay ink."""
    fur = "".join(
        f"M{n(p0[0])} {n(p0[1])}Q{n(c[0])} {n(c[1])} {n(p1[0])} {n(p1[1])}"
        for p0, c, p1 in strands()
    )
    eyes = "\n".join(
        f'  <ellipse class="eye" cx="{n(x)}" cy="{n(y)}" rx="{n(rx)}" ry="{n(ry)}"/>'
        for x, y, rx, ry in EYES
    )
    glints = "\n".join(
        f'  <circle class="glint" cx="{n(x)}" cy="{n(y)}" r="{n(r)}"/>'
        for x, y, r in GLINTS
    )
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <style>
    .green {{ fill: {GREEN}; }}
    .fur {{ fill: none; stroke: {GREEN}; }}
    .eye {{ fill: {INK}; }}
    .glint {{ fill: {WHITE}; }}
    @media (prefers-color-scheme: dark) {{
      .green {{ fill: {GREEN_DARK}; }}
      .fur {{ stroke: {GREEN_DARK}; }}
    }}
  </style>
  <circle class="green" cx="{n(CX)}" cy="{n(CY)}" r="{n(BODY_R)}"/>
  <path class="fur" d="{fur}" stroke-width="{n(FUR_WIDTH)}" stroke-linecap="round"/>
{eyes}
{glints}
</svg>
"""


def render(size, background=None, scale_of_canvas=1.0, glints=True):
    """Draw the mark at `size` px. With a background, the mark fills
    `scale_of_canvas` of the canvas, centered."""
    ss = 16  # supersampling factor; BOX downsampling averages it back down
    big = size * ss
    img = Image.new("RGBA", (big, big), background or (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    mark = big * scale_of_canvas
    offset = (big - mark) / 2
    unit = mark / 32

    def at(x, y):
        return (offset + x * unit, offset + y * unit)

    def ellipse(x, y, rx, ry, fill):
        x, y = at(x, y)
        draw.ellipse((x - rx * unit, y - ry * unit, x + rx * unit, y + ry * unit), fill=fill)

    ellipse(CX, CY, BODY_R, BODY_R, GREEN)
    width = FUR_WIDTH * unit
    for p0, c, p1 in strands():
        points = []
        for i in range(17):
            t = i / 16
            points.append(at(*(
                (1 - t) ** 2 * p0[k] + 2 * (1 - t) * t * c[k] + t ** 2 * p1[k]
                for k in (0, 1)
            )))
        draw.line(points, fill=GREEN, width=round(width), joint="curve")
        for x, y in (points[0], points[-1]):  # round caps
            draw.ellipse((x - width / 2, y - width / 2, x + width / 2, y + width / 2), fill=GREEN)
    for x, y, rx, ry in EYES:
        ellipse(x, y, rx, ry, INK)
    if glints:
        for x, y, r in GLINTS:
            ellipse(x, y, r, r, WHITE)
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

    # Tab icons: transparent, light-theme colors. At 16px the glints are
    # under half a pixel and only turn the eyes grey, so they're left out.
    ico_sizes = [render(16, glints=False), render(32), render(48)]
    write_ico(out / "favicon.ico", ico_sizes)

    # Home-screen and install icons: opaque porcelain square. At 0.6 of the
    # canvas the tip of the tuft, the mark's farthest point, sits well inside
    # the maskable safe zone (a circle 80% of the icon's width); iOS only
    # rounds the corners, so the touch icon can run a little larger.
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
