import { SequencePlot } from './SequencePlot.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class SequencePlotCreator extends SpanningCreator {
    createMobject() {
        let p = this.getStartPoint();
        return new SequencePlot({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SequencePlotCreator.js.map