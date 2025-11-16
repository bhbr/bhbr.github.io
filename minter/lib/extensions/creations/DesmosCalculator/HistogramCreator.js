import { Histogram } from './Histogram.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class HistogramCreator extends SpanningCreator {
    defaults() {
        return {
            helpText: 'Shows the distribution of the entries of a number list as a histogram. The binning parameters and colors can be changed as input variables.'
        };
    }
    createMobject() {
        let p = this.getStartPoint();
        return new Histogram({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=HistogramCreator.js.map