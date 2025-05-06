import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class PlotButton extends CreativeButton {
    defaults() {
        return {
            creations: ['plot', 'hist'],
            icon: new ImageView({
                imageLocation: '../../assets/plot.png',
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
//# sourceMappingURL=PlotButton.js.map