import { CreativeButton } from '../../../../core/sidebar_buttons/CreativeButton.js';
export class ConCircleButton extends CreativeButton {
    defaults() {
        return {
            creations: ['circle']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ConCircleButton.js.map