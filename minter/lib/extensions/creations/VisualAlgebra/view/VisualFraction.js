import { VisualOperator } from './VisualOperator.js';
import { FORMULA_PADDING } from './constants.js';
import { Line } from '../../../../core/shapes/Line.js';
export class VisualFraction extends VisualOperator {
    defaults() {
        return {
            operator: '/',
            fractionBar: new Line()
        };
    }
    mutabilities() {
        return {
            operator: 'never'
        };
    }
    get numerator() {
        return this.child1;
    }
    set numerator(newValue) {
        this.child1 = newValue;
    }
    get denominator() {
        return this.child2;
    }
    set denominator(newValue) {
        this.child2 = newValue;
    }
    setup() {
        super.setup();
        this.remove(this.operatorSymbol);
        this.add(this.fractionBar);
    }
    updateContent() {
        super.updateContent();
        let barWidth = Math.max(this.numerator.getWidth(), this.denominator.getWidth()) + 2 * FORMULA_PADDING;
        this.numerator.update({
            anchor: [
                0.5 * (barWidth - this.numerator.getWidth()),
                FORMULA_PADDING
            ]
        });
        this.fractionBar.update({
            startPoint: [FORMULA_PADDING, this.numerator.getHeight() + 2 * FORMULA_PADDING],
            endPoint: [this.getWidth() - FORMULA_PADDING, this.numerator.getHeight() + 2 * FORMULA_PADDING]
        });
        this.denominator.update({
            anchor: [
                0.5 * (barWidth - this.denominator.getWidth()),
                this.numerator.getHeight() + 3 * FORMULA_PADDING
            ]
        });
        this.numerator.updateContent();
        this.denominator.updateContent();
    }
    getWidth() {
        return Math.max(this.numerator.getWidth(), this.denominator.getWidth()) + 2 * FORMULA_PADDING;
    }
    getHeight() {
        return this.numerator.getHeight() + this.denominator.getHeight() + 4 * FORMULA_PADDING;
    }
}
//# sourceMappingURL=VisualFraction.js.map