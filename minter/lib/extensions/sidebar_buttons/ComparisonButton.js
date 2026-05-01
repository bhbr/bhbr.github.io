import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ComparisonButton extends CreativeButton {
    defaults() {
        return {
            creations: ['less than', 'less or equal', 'greater than', 'greater or equal', 'equal', 'not equal'],
            iconSize: 25,
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ComparisonButton.js.map