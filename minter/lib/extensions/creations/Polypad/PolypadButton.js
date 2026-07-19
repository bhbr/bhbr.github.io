import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class PolypadButton extends CreativeButton {
    defaults() {
        return {
            creations: ['polypad']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=PolypadButton.js.map