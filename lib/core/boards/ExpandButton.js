import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { Transform } from '../../core/classes/Transform.js';
import { Color } from '../../core/classes/Color.js';
import { Circle } from '../../core/shapes/Circle.js';
export class ExpandButton extends Circle {
    defaults() {
        return {
            transform: Transform.identity(),
            midpoint: [15, 15],
            screenEventHandler: ScreenEventHandler.Self,
            radius: 12,
            backgroundColor: Color.clear(),
            fillColor: Color.gray(0.25),
            fillOpacity: 1,
            strokeWidth: 0,
            label: new TextLabel({
                color: Color.white()
            })
        };
    }
    mutabilities() {
        return {
            transform: 'never',
            midpoint: 'never',
            radius: 'never',
            screenEventHandler: 'never',
            backgroundColor: 'never',
            label: 'never'
        };
    }
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    onTap(e) {
        this.parent.toggleViewState();
    }
    onTouchTap(e) {
        this.onTap(e);
    }
    onPenTap(e) {
        this.onTap(e);
    }
    onMouseClick(e) {
        this.onTap(e);
    }
    setup() {
        super.setup();
        this.add(this.label);
        this.label.view.frame.update({
            width: 2 * this.radius,
            height: 2 * this.radius
        });
    }
}
//# sourceMappingURL=ExpandButton.js.map