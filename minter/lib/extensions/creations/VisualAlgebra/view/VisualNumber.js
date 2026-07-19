import { VisualSymbol } from './VisualSymbol.js';
import { VisualFormula } from './VisualFormula.js';
import { FORMULA_PADDING } from './constants.js';
import { Color } from '../../../../core/classes/Color.js';
export class VisualNumber extends VisualFormula {
    defaults() {
        return {
            value: NaN,
            symbol: null,
            borderWidth: 0,
            backgroundColor: Color.clear()
        };
    }
    setup() {
        this.symbol = new VisualSymbol({ texString: `${this.value}` });
        this.add(this.symbol);
        //this.disable()
        super.setup();
    }
    getValue() {
        return this.value;
    }
    fullyLoaded() {
        return this.symbol.fullyLoaded();
    }
    updateContent() {
        if (this.symbol) {
            this.symbol.update({
                anchor: [FORMULA_PADDING, FORMULA_PADDING],
                texString: `${this.value}`
            });
        }
        super.updateContent();
    }
    getWidth() {
        if (this.symbol) {
            return this.symbol.getWidth() + 2 * FORMULA_PADDING;
        }
        else {
            return 0;
        }
    }
    getHeight() {
        if (this.symbol) {
            return this.symbol.getHeight() + 2 * FORMULA_PADDING;
        }
        else {
            return 0;
        }
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['fontSize'] !== undefined) {
            this.symbol.update({
                fontSize: this.fontSize
            });
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VisualNumber.js.map