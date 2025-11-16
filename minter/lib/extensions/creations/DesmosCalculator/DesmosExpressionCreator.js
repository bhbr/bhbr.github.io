import { DesmosExpression } from './DesmosExpression.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class DesmosExpressionCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'An algebraic expression. Input variables are detected automatically. You can define the name of the output variable using an equals sign.'
        };
    }
    createMobject() {
        return new DesmosExpression({
            anchor: this.getStartPoint()
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosExpressionCreator.js.map