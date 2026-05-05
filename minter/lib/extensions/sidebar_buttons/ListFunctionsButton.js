import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ListFunctionsButton extends CreativeButton {
    defaults() {
        return {
            creations: ['list', 'sum', 'mean'],
            iconSize: 25
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ListFunctionsButton.js.map