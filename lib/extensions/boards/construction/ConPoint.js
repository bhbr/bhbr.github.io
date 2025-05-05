import { Circle } from '../../../core/shapes/Circle.js';
import { vertexIsNaN, vertexOrigin } from '../../../core/functions/vertex.js';
import { Color } from '../../../core/classes/Color.js';
export class ConPoint extends Circle {
    defaults() {
        return {
            radius: 7.0,
            fillOpacity: 1.0,
            fillColor: Color.white()
        };
    }
    mutabilities() {
        return {
            radius: 'never',
            fillOpacity: 'in_subclass'
        };
    }
    setup() {
        super.setup();
        if (!this.midpoint || vertexIsNaN(this.midpoint)) {
            this.update({ midpoint: vertexOrigin() });
        }
    }
}
//# sourceMappingURL=ConPoint.js.map