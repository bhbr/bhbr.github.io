import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class NumberButton extends CreativeButton {
    defaults() {
        return {
            creations: ['num', 'numlist', 'input', 'slider', 'stepper']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=NumberButton.js.map