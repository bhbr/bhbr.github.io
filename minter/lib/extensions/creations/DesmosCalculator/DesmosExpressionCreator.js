import { DesmosExpression } from './DesmosExpression.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class DesmosExpressionCreator extends DraggingCreator {
    createMobject() {
        return new DesmosExpression({
            anchor: this.getStartPoint()
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosExpressionCreator.js.map