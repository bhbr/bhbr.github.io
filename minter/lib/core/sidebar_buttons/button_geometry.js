export const BUTTON_CENTER_X = 50;
export const BUTTON_CENTER_Y = 70;
export const BUTTON_SPACING = 12.5;
export const BUTTON_RADIUS = 25;
export const BUTTON_SCALE_FACTOR = 1.3;
export const OPTION_SPACING = 40;
export function buttonCenter(verticalIndex, horizontalIndex = 0) {
    let y = BUTTON_CENTER_Y + verticalIndex * (BUTTON_SPACING + 2 * BUTTON_RADIUS);
    return [BUTTON_CENTER_X + horizontalIndex * OPTION_SPACING, y];
}
export function buttonAnchor(verticalIndex, horizontalIndex = 0) {
    let c = buttonCenter(verticalIndex, horizontalIndex);
    return [c[0] - BUTTON_RADIUS, c[1] - BUTTON_RADIUS];
}
//# sourceMappingURL=button_geometry.js.map