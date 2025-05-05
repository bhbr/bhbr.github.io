import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class ListFunctionsButton extends CreativeButton {
    defaults() {
        return {
            creations: ['sum', 'avg', 'cumsum', 'cumavg']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ListFunctionsButton.js.map