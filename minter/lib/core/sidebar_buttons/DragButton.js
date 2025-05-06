import { ToggleButton } from './ToggleButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class DragButton extends ToggleButton {
    defaults() {
        return {
            messageKey: 'drag',
            icon: new ImageView({
                imageLocation: '../../assets/drag.png',
                frameWidth: 30,
                frameHeight: 30
            })
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DragButton.js.map