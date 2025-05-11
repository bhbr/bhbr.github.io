export const BUTTON_CENTER_X = 50;
export const BUTTON_CENTER_Y = 50;
export const BUTTON_SPACING = 12.5;
export const BUTTON_RADIUS = 25;
export const BUTTON_SCALE_FACTOR = 1.3;
export const OPTION_SPACING = 25;
export function buttonCenter(verticalIndex, horizontalIndex = 0) {
    let y = BUTTON_CENTER_X + verticalIndex * (BUTTON_SPACING + 2 * BUTTON_RADIUS);
    return [BUTTON_CENTER_X + horizontalIndex * OPTION_SPACING, y];
}
//# sourceMappingURL=button_geometry.js.map