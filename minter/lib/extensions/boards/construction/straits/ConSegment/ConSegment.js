import { vertexSubtract, vertexNorm2 } from '../../../../../core/functions/vertex.js';
import { ConStrait } from '../ConStrait.js';
export class ConSegment extends ConStrait {
    vectorComponents() {
        return vertexSubtract(this.endPoint, this.startPoint);
    }
    norm2() { return vertexNorm2(this.vectorComponents()); }
    norm() { return Math.sqrt(this.norm2()); }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConSegment.js.map