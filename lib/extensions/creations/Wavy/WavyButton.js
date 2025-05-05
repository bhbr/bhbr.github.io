import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class WavyButton extends CreativeButton {
    defaults() {
        return {
            creations: ['wavy', 'desmos']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=WavyButton.js.map