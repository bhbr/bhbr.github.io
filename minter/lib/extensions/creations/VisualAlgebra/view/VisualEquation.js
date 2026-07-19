import { VisualOperator } from './VisualOperator.js';
export class VisualEquation extends VisualOperator {
    defaults() {
        return {
            operator: '='
        };
    }
    getValue() {
        return NaN;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VisualEquation.js.map