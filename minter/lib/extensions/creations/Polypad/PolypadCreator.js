import { PolypadMobject } from './PolypadMobject.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class PolypadCreator extends SpanningCreator {
    createMobject() {
        let p = this.getStartPoint();
        return new PolypadMobject({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PolypadCreator.js.map