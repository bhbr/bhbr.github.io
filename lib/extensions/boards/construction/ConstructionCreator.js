import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
import { Construction } from '../../../extensions/boards/construction/Construction.js';
export class ConstructionCreator extends SpanningCreator {
    createMobject() {
        let c = new Construction({
            compactAnchor: this.topLeftVertex(),
            compactWidth: this.getWidth(),
            compactHeight: this.getHeight()
        });
        c.contractStateChange();
        return c;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConstructionCreator.js.map