import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class CoinButton extends CreativeButton {
    defaults() {
        return {
            creations: ['coin', 'coin row']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=CoinButton.js.map