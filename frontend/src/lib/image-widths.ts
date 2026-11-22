/** The widths of a cover on the home page's feature and wide tiles, and on its project page. */
export const WIDE_COVER_WIDTHS = [480, 720, 960, 1280, 1600];

/** The widths of a cover on the home page's small tiles. */
export const TILE_COVER_WIDTHS = [320, 480, 640, 800];

/** The widths of a cover on the Projects page's cards. */
export const CARD_COVER_WIDTHS = [400, 640, 800, 1200];

/** The widths of an image in a project page's gallery. */
export const GALLERY_WIDTHS = [400, 640, 800, 1200];

/** The width of a project page's link preview, drawn from its cover. */
export const PREVIEW_WIDTH = 1200;

/** The widest copy the site serves of a cover, and so the widest a committed cover may be. */
export const COVER_MAX_WIDTH = Math.max(
  ...WIDE_COVER_WIDTHS,
  ...TILE_COVER_WIDTHS,
  ...CARD_COVER_WIDTHS,
  PREVIEW_WIDTH,
);

/** The widest copy the site serves of a gallery image. */
export const GALLERY_MAX_WIDTH = Math.max(...GALLERY_WIDTHS);

/**
 * The shapes a cover may have, as width over height: from 4:3, the small
 * tiles' shape, to 16:10. A space draws a screenshot at its full width, so a
 * narrower cover loses more of its bottom in a 16:9 tile, and a wider one
 * leaves more of a 4:3 tile to the tint.
 */
export const COVER_RATIOS = { min: 4 / 3, max: 16 / 10 };

/** The shape of a gallery image, as every gallery space has it. */
export const GALLERY_RATIO = 16 / 9;

/** How far a screenshot's shape may stray from its bounds, for rounding. */
export const RATIO_TOLERANCE = 0.01;
