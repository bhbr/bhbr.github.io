import { ToggleButton } from './ToggleButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class LinkButton extends ToggleButton {
    defaults() {
        return {
            messageKey: 'link',
            icon: new ImageView({
                imageLocation: '../../assets/link.png',
                frameWidth: 40,
                frameHeight: 40
            })
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=LinkButton.js.map