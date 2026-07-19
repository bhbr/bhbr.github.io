import { vertexAdd, vertexSubtract, vertexMultiply } from '../../../../../core/functions/vertex.js';
import { ConStrait } from '../ConStrait.js';
export class ConRay extends ConStrait {
    drawingEndPoint() {
        if (this.startPoint == this.endPoint) {
            return this.endPoint;
        }
        return vertexAdd(this.startPoint, vertexMultiply(vertexSubtract(this.endPoint, this.startPoint), 100));
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConRay.js.map