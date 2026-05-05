import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class NumberButton extends CreativeButton {
    defaults() {
        return {
            creations: ['number', 'slider', 'stepper'],
            iconSize: 25
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=NumberButton.js.map