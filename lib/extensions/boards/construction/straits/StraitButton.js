import { CreativeButton } from '../../../../core/sidebar_buttons/CreativeButton.js';
export class StraitButton extends CreativeButton {
    defaults() {
        return {
            creations: ['line', 'segment', 'ray']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=StraitButton.js.map