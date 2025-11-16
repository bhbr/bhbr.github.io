import { CreativeButton } from '../../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../../core/mobjects/ImageView.js';
export class ColorSampleButton extends CreativeButton {
    defaults() {
        return {
            creations: ['color wheel', 'rgb color'],
            icon: new ImageView({
                imageLocation: '../../assets/color_wheel.png',
                frameWidth: 32,
                frameHeight: 32
            }),
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ColorSampleButton.js.map