import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class ConButton extends CreativeButton {
    defaults() {
        return {
            creations: ['geo']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ConButton.js.map