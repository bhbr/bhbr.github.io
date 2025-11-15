import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class ConButton extends CreativeButton {
    defaults() {
        return {
            creations: ['construction']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ConButton.js.map