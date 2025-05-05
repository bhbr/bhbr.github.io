import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { Color } from '../../core/classes/Color.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class SimpleButton extends TextLabel {
    defaults() {
        return {
            frameWidth: 40,
            frameHeight: 20,
            backgroundColor: Color.black(),
            color: Color.white(),
            borderColor: Color.white(),
            borderWidth: 1,
            screenEventHandler: ScreenEventHandler.Self,
            visible: false
        };
    }
    action() { } // reassigned on creation or overwritten in subclass
    onPointerUp(e) {
        this.action();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SimpleButton.js.map