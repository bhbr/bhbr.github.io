import { WheelColorSample } from './WheelColorSample.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { vertexTranslatedBy } from '../../../core/functions/vertex.js';
export class WheelColorSampleCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A wheel-shaped color picker. The angle sets its hue, the saturation and value are fixed to 100 %.'
        };
    }
    createMobject() {
        return new WheelColorSample({
            midpoint: this.getStartPoint()
        });
    }
    updateFromTip(q, redraw = true) {
        let r = this.creation.circle.radius;
        super.updateFromTip(vertexTranslatedBy(q, [-r, -r]), redraw);
        this.creation.hideLinks();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=WheelColorSampleCreator.js.map