import { DesmosExpressionSheet } from './DesmosExpressionSheet.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class DesmosExpressionSheetCreator extends SpanningCreator {
    defaults() {
        return {
            helpText: 'An list of algebraic expressions. Input variables are detected automatically. The names of the output variables are set using an equals sign.'
        };
    }
    createMobject() {
        return new DesmosExpressionSheet({
            anchor: this.getStartPoint(),
            compactWidth: this.getWidth(),
            compactHeight: this.getHeight()
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosExpressionSheetCreator.js.map