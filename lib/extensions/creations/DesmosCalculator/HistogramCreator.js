import { Histogram } from './Histogram.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class HistogramCreator extends SpanningCreator {
    createdMobject() {
        let p = this.getStartPoint();
        return new Histogram({
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
//# sourceMappingURL=HistogramCreator.js.map