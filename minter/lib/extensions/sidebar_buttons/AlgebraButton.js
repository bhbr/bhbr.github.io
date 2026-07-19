import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class AlgebraButton extends CreativeButton {
    defaults() {
        return {
            creations: ['expression', 'equation'],
            iconSize: 35
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=AlgebraButton.js.map