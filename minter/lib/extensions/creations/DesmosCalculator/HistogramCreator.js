import { Histogram } from './Histogram.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class HistogramCreator extends SpanningCreator {
    createMobject() {
        let p = this.getStartPoint();
        return new Histogram({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=HistogramCreator.js.map