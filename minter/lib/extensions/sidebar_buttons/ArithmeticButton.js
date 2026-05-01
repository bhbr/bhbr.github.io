import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ArithmeticButton extends CreativeButton {
    defaults() {
        return {
            creations: ['add', 'subtract', 'multiply', 'divide'],
            iconSize: 20
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ArithmeticButton.js.map