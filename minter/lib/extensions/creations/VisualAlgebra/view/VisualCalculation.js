import { getPaper, getSidebar } from '../../../../core/functions/getters.js';
import { Mobject } from '../../../../core/mobjects/Mobject.js';
import { Linkable } from '../../../../core/linkables/Linkable.js';
import { ScreenEventHandler } from '../../../../core/mobjects/screen_events.js';
import { Color } from '../../../../core/classes/Color.js';
import { VisualFormulaMaker } from './VisualFormulaMaker.js';
import { Algebra } from '../model/Algebra.js';
import { conditionTrigger } from '../../../../core/functions/various.js';
import { VisualFormulaPopover } from './VisualFormulaPopover.js';
import { FORMULA_HIGHLIGHT_BACKGROUND_COLORS, FORMULA_HIGHLIGHT_BORDER_COLORS } from './constants.js';
export class VisualCalculation extends Linkable {
    defaults() {
        return {
            frameWidth: 100,
            frameHeight: 50,
            screenEventHandler: ScreenEventHandler.Self,
            MQ: null,
            inputField: null,
            inputFieldWrapper: new Mobject(),
            span: null,
            formulas: [],
            algebra: new Algebra(),
            popover: null,
            maker: new VisualFormulaMaker(),
            highlightColorIndex: 0,
            fontSize: 28
        };
    }
    setup() {
        super.setup();
        for (let formula of this.formulas) {
            formula.update({
                fontSize: this.fontSize
            });
            this.add(formula);
        }
        this.createInputField();
        this.boundKeyPressed = this.keyPressed.bind(this);
        this.view.div.addEventListener('keydown', this.boundKeyPressed.bind(this));
    }
    createInputField() {
        this.MQ = MathQuill.getInterface(2);
        this.addDependency('frameWidth', this.inputFieldWrapper, 'frameWidth');
        this.addDependency('frameHeight', this.inputFieldWrapper, 'frameHeight');
        let p = document.createElement('p');
        this.span = document.createElement('span');
        this.span.style.color = 'white';
        this.span.style.fontSize = '28px';
        this.span.style.backgroundColor = Color.black().toCSS();
        this.span.style.border = '2px solid white';
        this.span.style.width = '200px';
        p.append(this.span);
        this.inputFieldWrapper.view.div.append(p);
        this.add(this.inputFieldWrapper);
        this.inputField = this.MQ.MathField(this.span, {
            handlers: {}
        });
        conditionTrigger((() => (this.inputField !== null)).bind(this), this.onInputFieldLoaded.bind(this));
    }
    onInputFieldLoaded() {
        this.inputField.write(' ');
        this.focus();
    }
    renderFirstFormula() {
        let tex = this.inputField.latex();
        let formula = this.maker.texToVisual(tex);
        if (formula) {
            this.addFormula(formula);
            this.remove(this.inputFieldWrapper);
        }
        else {
            this.inputField.focus();
        }
    }
    lastFormula() {
        if (this.formulas.length == 0) {
            return null;
        }
        return this.formulas[this.formulas.length - 1];
    }
    addFormula(formula) {
        if (this.lastFormula()) {
            this.lastFormula().disable();
            this.lastFormula().disableSubmobs();
        }
        this.formulas.push(formula);
        formula.update({
            calculation: this,
            anchor: [0, 125 * this.formulas.length],
            fontSize: this.fontSize
        });
        this.add(formula);
    }
    focus() {
        super.focus();
        this.inputField.focus();
        this.activateKeyboard();
        getPaper().sensor.savedOnPointerUp = getPaper().sensor.onPointerUp;
        getPaper().sensor.onPointerUp = this.blur.bind(this);
    }
    blur() {
        super.blur();
        this.inputField.blur();
        this.deactivateKeyboard();
        getPaper().sensor.onPointerUp = getPaper().sensor.savedOnPointerUp;
        getPaper().sensor.savedOnPointerUp = function (e) { };
        this.renderFirstFormula();
    }
    activateKeyboard() {
        getPaper().activeKeyboard = false;
        for (let button of getSidebar().buttons) {
            button.activeKeyboard = false;
        }
    }
    boundActivateKeyboard() { }
    deactivateKeyboard() {
        getPaper().activeKeyboard = true;
        for (let button of getSidebar().buttons) {
            button.activeKeyboard = true;
        }
    }
    boundDeactivateKeyboard() { }
    boundKeyPressed(e) { }
    keyPressed(e) {
        if (e.key == '13' || e.key == 'Enter' || e.key == 'Return') {
            this.blur();
        }
    }
    showPopover(subformula) {
        let startTree = subformula.formulaTree;
        let applicableRules = this.algebra.applicableRules(startTree);
        this.update({
            popover: new VisualFormulaPopover({
                rootMobject: subformula,
                direction: 'bottom'
            })
        });
        let possibleFormulas = [];
        if (!isNaN(subformula.getValue())) {
            let result = this.maker.treeToVisual([`${subformula.getValue()}`, []]);
            possibleFormulas.push(result);
        }
        for (let [name, rule] of Object.entries(applicableRules)) {
            let resultTree = this.algebra.applyRuleToTree(name, startTree);
            let transformedFormula = this.maker.treeToVisual(resultTree);
            transformedFormula.update({
                fontSize: 20
            });
            possibleFormulas.push(transformedFormula);
        }
        this.popover.update({
            formulas: possibleFormulas
        });
        subformula.add(this.popover);
    }
    highlightBackgroundColor() {
        return FORMULA_HIGHLIGHT_BACKGROUND_COLORS[this.highlightColorIndex];
    }
    highlightBorderColor() {
        return FORMULA_HIGHLIGHT_BORDER_COLORS[this.highlightColorIndex];
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VisualCalculation.js.map