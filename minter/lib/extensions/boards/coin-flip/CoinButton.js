import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
export class CoinButton extends CreativeButton {
    defaults() {
        return {
            creations: ['coin', 'coin row', 'coin stack'],
            iconSize: 30
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=CoinButton.js.map