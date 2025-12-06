import { ScatterPlot } from './ScatterPlot.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class ScatterPlotCreator extends SpanningCreator {
    defaults() {
        return {
            helpText: 'Plots the entries of two number lists as a scatter plot.'
        };
    }
    createMobject() {
        let p = this.getStartPoint();
        return new ScatterPlot({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ScatterPlotCreator.js.map