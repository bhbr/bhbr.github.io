import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class NumberButton extends CreativeButton {
    defaults() {
        return {
            creations: ['number', 'list', 'input', 'slider', 'stepper'],
            icon: new ImageView({
                imageLocation: '../../assets/number.png',
                frameWidth: 25,
                frameHeight: 25
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=NumberButton.js.map