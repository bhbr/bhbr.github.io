import { TextLabel } from './TextLabel.js';
import { RoundedRectangle } from '../../core/shapes/RoundedRectangle.js';
import { Color } from '../../core/classes/Color.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class SimpleButton extends RoundedRectangle {
    defaults() {
        return {
            width: 50,
            height: 25,
            cornerRadius: 20,
            label: new TextLabel({
                textColor: Color.white()
            }),
            fillColor: Color.gray(0.3),
            strokeColor: Color.gray(0.4),
            strokeWidth: 1.0,
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    setup() {
        super.setup();
        this.add(this.label);
        this.label.update({
            frameWidth: this.width,
            frameHeight: this.height
        });
    }
    get text() {
        return this.label.text;
    }
    set text(newValue) {
        this.label.update({
            text: newValue
        });
    }
    action() { } // reassigned on creation or overwritten in subclass
    onPointerUp(e) {
        this.update({
            fillColor: Color.gray(0.3)
        });
        this.label.update({
            textColor: Color.white()
        });
        this.action();
    }
    onPointerDown(e) {
        this.update({
            fillColor: Color.white()
        });
        this.label.update({
            textColor: Color.black()
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SimpleButton.js.map