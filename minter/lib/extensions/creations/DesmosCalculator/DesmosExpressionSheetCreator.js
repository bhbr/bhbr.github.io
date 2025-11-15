import { DesmosExpressionSheet } from './DesmosExpressionSheet.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class DesmosExpressionSheetCreator extends SpanningCreator {
    createMobject() {
        return new DesmosExpressionSheet({
            anchor: this.getStartPoint(),
            compactWidth: this.getWidth(),
            compactHeight: this.getHeight()
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosExpressionSheetCreator.js.map