import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ArithmeticButton extends CreativeButton {
    defaults() {
        return {
            creations: ['+', '–', '&times;', '/']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ArithmeticButton.js.map