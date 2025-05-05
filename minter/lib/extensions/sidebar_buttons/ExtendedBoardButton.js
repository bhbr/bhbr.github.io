import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ExtendedBoardButton extends CreativeButton {
    defaults() {
        return {
            creations: ['board', 'geo']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ExtendedBoardButton.js.map