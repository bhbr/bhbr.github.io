import { Circle } from '../../core/shapes/Circle.js';
import { TextLabel } from './TextLabel.js';
import { Color } from '../../core/classes/Color.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class RadioButton extends Circle {
    defaults() {
        return {
            radius: 9,
            fillColor: Color.white(),
            fillOpacity: 0,
            bullet: new Circle({
                radius: 4,
                fillColor: Color.white(),
                fillOpacity: 1
            }),
            label: new TextLabel({
                text: 'bla',
                horizontalAlign: 'left'
            }),
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    setup() {
        super.setup();
        this.bullet.update({
            midpoint: [this.radius, this.radius],
        });
        this.label.update({
            frameHeight: 2 * this.radius,
            anchor: [3 * this.radius, 0]
        });
        this.add(this.label);
    }
    onPointerDown(e) {
        this.update({
            fillOpacity: 0.5
        });
    }
    onPointerUp(e) {
        this.select();
        this.list.buttonSelected(this);
    }
    select() {
        this.update({
            fillOpacity: 0
        });
        this.add(this.bullet);
    }
    unselect() {
        this.remove(this.bullet);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=RadioButton.js.map