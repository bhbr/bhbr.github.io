import { SequencePlot } from './SequencePlot.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class SequencePlotCreator extends SpanningCreator {
    defaults() {
        return {
            helpText: 'Plots the entries of a number list as a graph.'
        };
    }
    createMobject() {
        let p = this.getStartPoint();
        return new SequencePlot({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SequencePlotCreator.js.map