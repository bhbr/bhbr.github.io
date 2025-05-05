import { vertexAdd, vertexSubtract, vertexMultiply } from '../../../../../core/functions/vertex.js';
import { ConStrait } from '../ConStrait.js';
export class ConLine extends ConStrait {
    drawingStartPoint() {
        if (this.startPoint == this.endPoint) {
            return this.startPoint;
        }
        return vertexAdd(this.endPoint, vertexMultiply(vertexSubtract(this.startPoint, this.endPoint), 100));
    }
    drawingEndPoint() {
        if (this.startPoint == this.endPoint) {
            return this.endPoint;
        }
        return vertexAdd(this.startPoint, vertexMultiply(vertexSubtract(this.endPoint, this.startPoint), 100));
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConLine.js.map