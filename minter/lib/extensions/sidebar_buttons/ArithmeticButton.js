import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ArithmeticButton extends CreativeButton {
    defaults() {
        return {
            creations: ['+', '–', '&times;', '/'],
            baseFontSize: 36
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ArithmeticButton.js.map