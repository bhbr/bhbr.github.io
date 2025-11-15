import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
import { DesmosCalculator } from './DesmosCalculator.js';
export class DesmosCalculatorCreator extends SpanningCreator {
    createMobject() {
        return new DesmosCalculator({
            anchor: this.getStartPoint(),
            frameWidth: this.frameWidth,
            frameHeight: this.frameHeight
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosCalculatorCreator.js.map