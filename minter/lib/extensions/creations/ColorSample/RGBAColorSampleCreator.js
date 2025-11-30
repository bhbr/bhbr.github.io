import { RGBAColorSample } from './RGBAColorSample.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { vertexAdd } from '../../../core/functions/vertex.js';
export class RGBAColorSampleCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A color defined by its red, green, blue and alpha (RGBA) components as input variables.',
            pointOffset: [-30, -60]
        };
    }
    createMobject() {
        return new RGBAColorSample({
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
//# sourceMappingURL=RGBAColorSampleCreator.js.map