import { VisualSymbol } from './VisualSymbol.js';
import { VisualFormula } from './VisualFormula.js';
import { FORMULA_PADDING } from './constants.js';
export class VisualFunction extends VisualFormula {
    defaults() {
        return {
            name: 'id',
            symbol: new VisualSymbol(),
            child: new VisualFormula({
                rootFormula: this.rootFormula
            })
        };
    }
    getValue() {
        let f = VisualFunction.functionDict[this.name];
        return f(this.child.getValue());
    }
    setup() {
        super.setup();
        this.add(this.symbol);
        this.add(this.child);
        this.update({
            subformulas: [this.child]
        });
    }
    updateContent() {
        let maxHeight = Math.max(this.symbol.getHeight(), this.child.getHeight());
        this.symbol.update({
            anchor: [
                FORMULA_PADDING,
                FORMULA_PADDING + 0.5 * (maxHeight - this.symbol.getHeight())
            ],
            texString: (this.name == 'opp') ? '-' : this.name
        });
        this.child.update({
            anchor: [
                this.symbol.getWidth() + 2 * FORMULA_PADDING,
                FORMULA_PADDING + 0.5 * (maxHeight - this.child.getHeight())
            ]
        });
        super.updateContent();
    }
    getWidth() {
        return this.symbol.getWidth() + this.child.getWidth() + 3 * FORMULA_PADDING;
    }
    getHeight() {
        return Math.max(this.symbol.getHeight(), this.child.getHeight()) + 2 * FORMULA_PADDING;
    }
    fullyLoaded() {
        return this.symbol.fullyLoaded() && this.child.fullyLoaded();
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['fontSize'] !== undefined) {
            this.symbol.update({
                fontSize: this.fontSize
            });
            this.child.update({
                fontSize: this.fontSize
            });
        }
    }
    mutabilities() { return {}; }
}
VisualFunction.functionDict = {
    'id': (x) => x,
    'opp': (x) => -x,
    '\\sqrt': Math.sqrt,
    '\\log': Math.log,
    '\\ln': Math.log,
    '\\exp': Math.exp,
    '\\sin': Math.sin,
    '\\cos': Math.cos,
    '\\tan': Math.tan,
    '\\cot': (x) => 1 / Math.tan(x),
    '\\sec': (x) => 1 / Math.cos(x),
    '\\csc': (x) => 1 / Math.sin(x),
    '\\arcsin': Math.asin,
    '\\arccos': Math.acos,
    '\\arctan': Math.atan,
    '\\arccot': (x) => Math.atan(1 / x),
    '\\arcsec': (x) => Math.acos(1 / x),
    '\\arccsc': (x) => Math.asin(1 / x),
    '\\sinh': Math.sinh,
    '\\cosh': Math.cosh,
    '\\tanh': Math.tanh,
    '\\arcsinh': Math.asinh,
    '\\arccosh': Math.acosh,
    '\\arctanh': Math.atanh
};
//# sourceMappingURL=VisualFunction.js.map