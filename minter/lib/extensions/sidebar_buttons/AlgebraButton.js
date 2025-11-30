import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class AlgebraButton extends CreativeButton {
    defaults() {
        return {
            creations: ['expression'],
            icon: new ImageView({
                imageLocation: '../../assets/expression.png',
                frameWidth: 35,
                frameHeight: 35
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=AlgebraButton.js.map