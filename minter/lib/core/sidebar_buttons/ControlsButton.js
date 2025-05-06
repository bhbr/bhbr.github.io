import { ToggleButton } from './ToggleButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class ControlsButton extends ToggleButton {
    defaults() {
        return {
            messageKey: 'ctrl',
            icon: new ImageView({
                imageLocation: '../../assets/ctrl.png',
                frameWidth: 30,
                frameHeight: 30
            })
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ControlsButton.js.map