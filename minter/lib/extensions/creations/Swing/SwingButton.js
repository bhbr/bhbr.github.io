import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class SwingButton extends CreativeButton {
    defaults() {
        return {
            creations: ['swing']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=SwingButton.js.map