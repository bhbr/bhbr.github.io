import { MathExpressionField } from './MathExpressionField.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class MathExpressionFieldCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'An algebraic expression. Input variables are detected automatically. You can define the name of the output variable using an equals sign.',
            pointOffset: [-20, -50]
        };
    }
    createMobject() {
        return new MathExpressionField({
            anchor: this.getStartPoint()
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=MathExpressionFieldCreator.js.map