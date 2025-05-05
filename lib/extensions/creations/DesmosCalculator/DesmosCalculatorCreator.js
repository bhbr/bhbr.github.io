import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
import { DesmosCalculator } from './DesmosCalculator.js';
export class DesmosCalculatorCreator extends SpanningCreator {
    createdMobject() {
        let p = this.getStartPoint();
        return new DesmosCalculator({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    dissolve() {
        let cm = this.createdMobject();
        this.parent.addToContent(cm);
        this.parent.remove(this);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosCalculatorCreator.js.map