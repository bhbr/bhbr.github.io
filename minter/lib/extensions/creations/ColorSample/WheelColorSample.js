import { ColorSample } from '../../../extensions/creations/ColorSample/ColorSample.js';
import { vertexSubtract } from '../../../core/functions/vertex.js';
import { TAU } from '../../../core/constants.js';
import { Color } from '../../../core/classes/Color.js';
import { Circle } from '../../../core/shapes/Circle.js';
import { COLOR_SAMPLE_RADIUS } from './ColorSample.js';
export class WheelColorSample extends ColorSample {
    defaults() {
        return {
            alpha: 1,
            outputProperties: [
                { name: 'color', type: 'Color' },
                { name: 'red', type: 'number' },
                { name: 'green', type: 'number' },
                { name: 'blue', type: 'number' }
            ],
            touchStartLocation: null,
            saturationShiftTime: null,
            timeoutID: null,
            intervalID: null,
            hue: 0,
            saturation: 1,
            value: 1,
            marker: new Circle({
                midpoint: [COLOR_SAMPLE_RADIUS, 0.2 * COLOR_SAMPLE_RADIUS],
                radius: 3,
                fillColor: Color.white(),
                fillOpacity: 1,
                strokeWidth: 0
            })
        };
    }
    mutabilities() {
        return {
            alpha: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.marker);
    }
    onPointerMove(e) {
        let p = this.sensor.localEventVertex(e);
        let t = Date.now();
        let dp = vertexSubtract(p, this.circle.midpoint);
        let angle = Math.atan2(dp[1], dp[0]);
        this.hue = angle + TAU / 2;
        let rgb = Color.hsv_to_rgb(this.hue, this.saturation, this.value);
        this.update({
            red: rgb[0], green: rgb[1], blue: rgb[2]
        });
        this.marker.update({
            midpoint: [
                COLOR_SAMPLE_RADIUS * (1 - 0.8 * Math.cos(this.hue)),
                COLOR_SAMPLE_RADIUS * (1 - 0.8 * Math.sin(this.hue))
            ]
        });
    }
}
//# sourceMappingURL=WheelColorSample.js.map