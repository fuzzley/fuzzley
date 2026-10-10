"""Draw the home page's link preview, frontend/public/images/og-home.jpg.

Two bento tiles on the page background: the name and role on the left, the
Solitaire Collection board on the right, with the tiled-f mark in the corner.
Uses the site's own font from node_modules, so run `yarn install` in
frontend/ first. Requires Pillow.

Usage, from the repository root: python branding/og-image/make_og_home.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[2]
FRONTEND = ROOT / "frontend"
FONT = (
    FRONTEND
    / "node_modules/@fontsource-variable/bricolage-grotesque/files"
    / "bricolage-grotesque-latin-opsz-normal.woff2"
)
BOARD = FRONTEND / "src/assets/projects/solitaire-klondike.webp"
OUT = FRONTEND / "public/images/og-home.jpg"

W, H = 1200, 630
SS = 2  # drawn at 2x, then scaled down for smooth edges
BG, TILE, INK, MUTED, GREEN, FELT = (
    "#E9ECEF",
    "#FFFFFF",
    "#14171B",
    "#5B636D",
    "#179A50",
    "#135C2B",
)
MARK = [  # the favicon geometry, on a 32-unit grid
    (2, 12, 6, 6, INK),
    (10, 8, 6, 22, INK),
    (18, 2, 10, 8, GREEN),
    (18, 12, 8, 6, INK),
]


def font(size, weight, opsz=None):
    f = ImageFont.truetype(str(FONT), size * SS)
    f.set_variation_by_axes([opsz or min(96, max(12, size)), weight])
    return f


def wrap(draw, text, f, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=f) <= width * SS:
            line = trial
        else:
            lines.append(line)
            line = word
    return lines + [line]


def main():
    img = Image.new("RGB", (W * SS, H * SS), BG)
    draw = ImageDraw.Draw(img)
    s = lambda v: round(v * SS)  # noqa: E731
    gap, radius = 36, 30

    # Left tile: mark, name, role.
    left = (gap, gap, 640, H - gap)
    draw.rounded_rectangle([s(v) for v in left], radius=s(radius), fill=TILE)
    unit = 56 / 32
    for x, y, w, h, color in MARK:
        x0, y0 = left[0] + 44 + x * unit, left[1] + 44 + y * unit
        draw.rounded_rectangle(
            [s(x0), s(y0), s(x0 + w * unit), s(y0 + h * unit)],
            radius=s(1.5 * unit),
            fill=color,
        )

    name = font(82, 800)
    lede = font(31, 420, opsz=24)
    y = left[3] - 44 - 3 * 42
    for line in wrap(draw, "Staff software engineer and manager at Google. Building browser games on the side.", lede, 500):
        draw.text((s(left[0] + 44), s(y)), line, font=lede, fill=MUTED)
        y += 42
    draw.text(
        (s(left[0] + 40), s(left[3] - 44 - 3 * 42 - 104)),
        "Andrey Gavel",
        font=name,
        fill=INK,
    )

    # Right tile: the solitaire board, cropped from the top left.
    right = (640 + 18, gap, W - gap, H - gap)
    rw, rh = s(right[2] - right[0]), s(right[3] - right[1])
    board = Image.open(BOARD).convert("RGB")
    scale = rh / board.height
    board = board.resize((round(board.width * scale), rh), Image.LANCZOS)
    board = board.crop((0, 0, rw, rh))
    mask = Image.new("L", (rw, rh), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, rw, rh], radius=s(radius), fill=255)
    tile = Image.new("RGB", (rw, rh), FELT)
    tile.paste(board, (0, 0))
    img.paste(tile, (s(right[0]), s(right[1])), mask)

    # Caption pill on the board.
    label = font(26, 700, opsz=24)
    text = "Solitaire Collection"
    tw = draw.textlength(text, font=label) / SS
    px, py = right[0] + 22, right[3] - 22 - 50
    draw.rounded_rectangle(
        [s(px), s(py), s(px + tw + 40), s(py + 50)], radius=s(25), fill=TILE
    )
    draw.text((s(px + 20), s(py + 9)), text, font=label, fill=INK)

    img.resize((W, H), Image.LANCZOS).save(
        OUT, "JPEG", quality=88, optimize=True, progressive=True
    )
    print(f"wrote {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
