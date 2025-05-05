import { WheelColorSample } from './WheelColorSample.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { vertexTranslatedBy } from '../../../core/functions/vertex.js';
export class WheelColorSampleCreator extends DraggingCreator {
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
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=WheelColorSampleCreator.js.map