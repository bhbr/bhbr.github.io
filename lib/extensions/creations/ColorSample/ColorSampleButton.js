import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class ColorSampleButton extends CreativeButton {
    defaults() {
        return {
            creations: ['rgb', 'wheel']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ColorSampleButton.js.map