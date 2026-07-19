import { CreativeButton } from './CreativeButton.js';
export class BoardButton extends CreativeButton {
    defaults() {
        return {
            creations: ['board']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=BoardButton.js.map