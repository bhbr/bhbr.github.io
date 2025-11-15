import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class ArithmeticButton extends CreativeButton {
    defaults() {
        return {
            creations: ['add', 'subtract', 'multiply', 'divide'],
            icon: new ImageView({
                imageLocation: '../../assets/add.png',
                frameWidth: 20,
                frameHeight: 20
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ArithmeticButton.js.map