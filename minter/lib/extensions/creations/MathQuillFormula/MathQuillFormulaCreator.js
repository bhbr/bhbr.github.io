import { MathQuillFormula } from './MathQuillFormula.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class MathQuillFormulaCreator extends DraggingCreator {
    defaults() {
        return {
            pointOffset: [-20, -50]
        };
    }
    createMobject() {
        return new MathQuillFormula({
            anchor: this.getStartPoint()
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=MathQuillFormulaCreator.js.map