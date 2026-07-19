import { VisualCalculation } from './VisualCalculation.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class EquationCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'An algebraic equation. Tap on subexpressions to see suggested solution steps.',
            pointOffset: [-20, -50]
        };
    }
    createMobject() {
        return new VisualCalculation({
            anchor: this.getStartPoint()
        });
    }
    dissolve() {
        super.dissolve();
        this.creation.focus();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=EquationCreator.js.map