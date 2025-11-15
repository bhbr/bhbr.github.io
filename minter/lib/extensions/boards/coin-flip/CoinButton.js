import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../../core/mobjects/ImageView.js';
export class CoinButton extends CreativeButton {
    defaults() {
        return {
            creations: ['coin', 'coin row', 'coin stack'],
            icon: new ImageView({
                imageLocation: '../../assets/coin.png',
                frameWidth: 40,
                frameHeight: 40
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=CoinButton.js.map