import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../../core/mobjects/ImageView.js';
export class ColorSampleButton extends CreativeButton {
    defaults() {
        return {
            creations: ['wheel', 'rgb'],
            icon: new ImageView({
                imageLocation: '../../assets/wheel.png',
                frameWidth: 32,
                frameHeight: 32
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ColorSampleButton.js.map