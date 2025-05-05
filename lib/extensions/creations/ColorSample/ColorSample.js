import { Color } from '../../../core/classes/Color.js';
import { Circle } from '../../../core/shapes/Circle.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
export const COLOR_SAMPLE_RADIUS = 30;
export class ColorSample extends Linkable {
    defaults() {
        return {
            circle: new Circle({
                radius: COLOR_SAMPLE_RADIUS,
                midpoint: [COLOR_SAMPLE_RADIUS, COLOR_SAMPLE_RADIUS],
                fillOpacity: 1
            }),
            color: Color.white(),
            frameWidth: 2 * COLOR_SAMPLE_RADIUS,
            frameHeight: 2 * COLOR_SAMPLE_RADIUS,
            outputProperties: [
                { name: 'color', type: 'Color' }
            ],
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    mutabilities() {
        return {
            circle: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.circle);
    }
    get red() { return this.color.red; }
    set red(newValue) {
        this.color.red = newValue;
    }
    get green() { return this.color.green; }
    set green(newValue) {
        this.color.green = newValue;
    }
    get blue() { return this.color.blue; }
    set blue(newValue) {
        this.color.blue = newValue;
    }
    get alpha() { return this.color.alpha; }
    set alpha(newValue) {
        let c = this.color.alpha = newValue;
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        this.circle.update({
            fillColor: this.color
        }, redraw);
    }
}
//# sourceMappingURL=ColorSample.js.map