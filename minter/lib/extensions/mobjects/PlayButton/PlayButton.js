import { SimpleButton } from '../../../core/mobjects/SimpleButton.js';
import { Color } from '../../../core/classes/Color.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
export class PlayButton extends SimpleButton {
    defaults() {
        return {
            screenEventHandler: ScreenEventHandler.Self,
            mobject: undefined,
            text: 'play',
            frameWidth: 40,
            frameHeight: 20,
            backgroundColor: Color.black(),
            color: Color.white(),
            borderColor: Color.white(),
            borderWidth: 1
        };
    }
    mutabilities() {
        return {
            screenEventHandler: 'never'
        };
    }
    action() {
        this.mobject.togglePlayState();
        this.toggleLabel();
    }
    toggleLabel() {
        this.update({
            text: (this.text == 'play') ? 'pause' : 'play'
        });
    }
}
//# sourceMappingURL=PlayButton.js.map