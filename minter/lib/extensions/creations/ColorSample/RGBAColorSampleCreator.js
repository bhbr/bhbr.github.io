import { RGBAColorSample } from './RGBAColorSample.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { vertexTranslatedBy } from '../../../core/functions/vertex.js';
export class RGBAColorSampleCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A color defined by its red, green and blue components as input variables.'
        };
    }
    createMobject() {
        return new RGBAColorSample({
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
//# sourceMappingURL=RGBAColorSampleCreator.js.map