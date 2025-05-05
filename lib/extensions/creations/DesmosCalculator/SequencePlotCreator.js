import { SequencePlot } from './SequencePlot.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class SequencePlotCreator extends SpanningCreator {
    createdMobject() {
        let p = this.getStartPoint();
        return new SequencePlot({
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
//# sourceMappingURL=SequencePlotCreator.js.map