import { WheelColorSample } from './WheelColorSample.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { vertexAdd } from '../../../core/functions/vertex.js';
export class WheelColorSampleCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A wheel-shaped color picker (HSV model). The angle sets its hue, the saturation and value are fixed to 100 %.',
            pointOffset: [-30, -60]
        };
    }
    createMobject() {
        return new WheelColorSample({
            midpoint: vertexAdd(this.getStartPoint(), this.pointOffset)
        });
    }
    updateFromTip(q, redraw = true) {
        let r = this.creation.circle.radius;
        super.updateFromTip(q, redraw);
        this.creation.hideLinks();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=WheelColorSampleCreator.js.map