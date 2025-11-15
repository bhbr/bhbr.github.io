import { DesmosCalculator } from './DesmosCalculator.js';
import { remove } from '../../../core/functions/arrays.js';
import { log } from '../../../core/functions/logging.js';
export class DesmosExpressionSheet extends DesmosCalculator {
    defaults() {
        return {
            compactWidth: 200,
            compactHeight: 150,
            expandedWidth: 502,
            expandedHeight: 380,
            minWidth: 200,
            minHeight: 150,
            expanded: false
        };
    }
    ensureMinimumFrameSize() {
        //log('DesmosExpressionSheet.ensureMinimumFrameSize')
        this.update({
            compactWidth: Math.max(this.compactWidth, this.minWidth),
            compactHeight: Math.max(this.compactHeight, this.minHeight),
            expandedWidth: Math.max(this.expandedWidth, this.compactWidth),
            expandedHeight: Math.max(this.expandedHeight, this.compactHeight)
        }, false);
        var changedFrame = false;
        if (this.frameWidth < this.minWidth) {
            this.update({ frameWidth: this.minWidth });
            changedFrame = true;
        }
        if (this.frameHeight < this.minHeight) {
            this.update({ frameHeight: this.minHeight });
            changedFrame = true;
        }
        if (changedFrame) {
            this.layoutFrames();
        }
    }
    layoutFrames() {
        log('DesmosExpressionSheet.layoutFrames');
        //log(`${this.frameWidth} ${this.frameHeight}`)
        if (this.expanded) {
            this.expand();
        }
        else {
            this.contract();
        }
    }
    layoutContent() {
        //log('DesmosExpressionSheet.layoutContent')
        let grapher = this.innerCanvas.view.div.getElementsByClassName('dcg-grapher')[0];
        grapher.style.visibility = 'hidden';
        grapher.style.width = '0%';
        let expressionPanel = this.innerCanvas.view.div.getElementsByClassName('dcg-exppanel-outer')[0];
        expressionPanel.style.width = `${this.frameWidth}px`;
        expressionPanel.style.height = `${this.frameHeight}px`;
        expressionPanel.style.top = '0px';
        let pillBoxes = this.innerCanvas.view.div.getElementsByClassName('dcg-pillbox-container')[0];
        pillBoxes.style.visibility = 'hidden';
        let addButton = this.innerCanvas.view.div.getElementsByClassName('dcg-add-expression-btn')[0];
        addButton.style.top = '-25px';
        let undoButton = this.innerCanvas.view.div.getElementsByClassName('dcg-action-undo')[0];
        undoButton.style.top = '-25px';
        undoButton.style.left = '-35px';
        let redoButton = this.innerCanvas.view.div.getElementsByClassName('dcg-action-redo')[0];
        redoButton.style.top = '-25px';
        redoButton.style.right = '-35px';
        let logo = this.innerCanvas.view.div.getElementsByClassName('dcg-expressions-branding')[0];
        logo.style.bottom = '0px';
    }
    resizeFrame(width, height) {
        //log('DesmosExpressionSheet.contract')
        let el = this.innerCanvas.view.div.querySelector('.dcg-exppanel-outer');
        if (el) {
            //log(`compact width: ${this.compactWidth}`)
            this.update({
                frameWidth: width,
                frameHeight: height
            });
            super.layoutFrames();
            let htmlel = el;
            window.setTimeout(function () {
                htmlel.style.top = '0px';
                htmlel.style.width = `${width}px`;
                htmlel.style.height = `${height}px`;
            }, 50);
        }
        else {
            window.setTimeout(this.resizeFrame.bind(this, width, height), 50);
        }
    }
    contract() {
        this.resizeFrame(this.compactWidth, this.compactHeight);
    }
    expand() {
        this.resizeFrame(this.expandedWidth, this.expandedHeight);
    }
    focus() {
        //log('DesmosExpressionSheet.focus')
        super.focus();
        this.showKeypad();
        this.expand();
        for (let label of this.innerCanvas.view.div.querySelectorAll('.dcg-minLabel')) {
            label.inert = false;
        }
    }
    blur() {
        //log('DesmosExpressionSheet.blur')
        super.blur();
        this.hideKeypad();
        this.contract();
        for (let label of this.innerCanvas.view.div.querySelectorAll('.dcg-minLabel')) {
            label.inert = true;
        }
    }
    calculatorExpressionDict() {
        let dict = {};
        for (let expr of this.calculator.getExpressions()) {
            dict[expr['id']] = expr;
        }
        return dict;
    }
    onChange(eventName, event) {
        let newExpressions = this.calculatorExpressionDict();
        let nbExprBefore = Object.keys(this.expressions).length;
        let nbExprAfter = Object.keys(newExpressions).length;
        if (nbExprAfter > nbExprBefore) {
            // new expression created
            for (let [id, expr] of Object.entries(newExpressions)) {
                if (!Object.keys(this.expressions).includes(id)) {
                    this.onExpressionCreated(expr);
                    return;
                }
            }
        }
        else if (nbExprAfter == nbExprBefore && !this.updating) {
            // expression edited
            for (let [id, newExpr] of Object.entries(newExpressions)) {
                let oldExpr = this.expressions[id];
                if (oldExpr === null) {
                    continue;
                }
                if (oldExpr['latex'] != newExpr['latex']) {
                    this.onExpressionEdited(oldExpr, newExpr);
                    return;
                }
            }
        }
        else {
            // expression deleted
            for (let [id, expr] of Object.entries(this.expressions)) {
                if (!Object.keys(newExpressions).includes(id)) {
                    this.onExpressionDeleted(expr);
                    return;
                }
            }
        }
    }
    onExpressionCreated(expression) {
        this.expressions[expression['id']] = expression;
    }
    onExpressionEdited(oldExpr, newExpr) {
        let id = oldExpr['id'];
        if (newExpr['id'] !== id) {
            throw `Mismatched expression IDs`;
        }
        // check for variable creation
        let variable = this.definedVariable(newExpr);
        let value = this.definingValue(newExpr);
        let term = this.definingTerm(newExpr);
        if (this.properties.includes(variable)) {
            // if it is a linked input variable, undo this edit
            let hook = this.inputList.hookNamed(variable);
            if (hook) {
                if (hook.linked) {
                    this.calculator.setExpression({
                        id: id,
                        latex: this.expressions[id]['latex']
                    });
                }
                else {
                    this.update();
                    this.updateDependents();
                }
                return;
            }
        }
        else {
            if (value !== null) {
                this.createSlidableVariable(variable, value);
            }
            else if (term !== null && term.length > 0) {
                let isError = this.calculator.expressionAnalysis[id].isError;
                if (!isError) {
                    this.createOutputVariable(variable);
                }
            }
        }
        this.expressions[id]['latex'] = newExpr['latex'];
    }
    onExpressionDeleted(expression) {
        delete this.expressions[expression['id']];
        // TODO: remove dependencies
    }
    definedVariable(expression) {
        let tex = expression['latex'];
        let parts = tex.split('=');
        if (parts.length != 2) {
            return null;
        }
        if (!this.isVariableName(parts[0])) {
            return null;
        }
        return parts[0];
    }
    definingValue(expression) {
        let tex = expression['latex'];
        let parts = tex.split('=');
        if (parts.length != 2) {
            return null;
        }
        if (!this.isNumericValue(parts[1])) {
            return null;
        }
        return parseFloat(parts[1]);
    }
    definingTerm(expression) {
        let tex = expression['latex'];
        let parts = tex.split('=');
        if (parts.length != 2) {
            return null;
        }
        return parts[1];
    }
    getExpressionNamed(name) {
        if (!this.calculator) {
            return null;
        }
        for (let expr of this.calculator.getExpressions()) {
            if (!expr['latex'].includes('=')) {
                continue;
            }
            let variable = this.definedVariable(expr);
            if (variable === name) {
                return expr;
            }
        }
        return null;
    }
    getValueOf(name) {
        let expr = this.getExpressionNamed(name);
        if (expr === null || this.outputHelperExpressions[name] === undefined) {
            return null;
        }
        return this.outputHelperExpressions[name].numericValue;
    }
    isVariableName(name) {
        // only supports single-letter variable names for now
        return name.length == 1 && 'qwertzuiopasdfghjklyxcvbnmQWERTZUIOPASDFGHJKLYXCVBNM'.includes(name);
    }
    isNumericValue(value) {
        return !isNaN(parseFloat(value));
    }
    createSlidableVariable(name, value) {
        log(`slidable ${name} ${value}`);
        if (name == null) {
            return;
        }
        this.secretInputExpressions[name] = this.calculator.HelperExpression({ latex: name });
        this.createInputVariable(name, value);
        this.createOutputVariable(name);
        // window.setTimeout( function() {
        // 	this.innerCanvas.view.div.querySelector('.dcg-minLabel').addEventListener('click', this.handleClick.bind(this), true)
        // 	this.innerCanvas.view.div.querySelector('.dcg-maxLabel').addEventListener('click', this.handleClick.bind(this), true)
        // }.bind(this), 100)
    }
    createInputVariable(name, value) {
        //log(`input ${name} ${value}`)
        this.createProperty(name, value);
        this.inputProperties.push({
            name: name,
            type: 'number',
            displayName: name
        });
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.inputList.view.hide();
    }
    removeInputVariable(name) {
        if (name == null) {
            return;
        }
        this.removeProperty(name);
        delete this.secretInputExpressions[name];
        for (let prop of this.inputProperties) {
            if (prop['name'] == name) {
                remove(this.inputProperties, prop);
                break;
            }
        }
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.inputList.view.hide();
    }
    createOutputVariable(name) {
        if (name == null) {
            return;
        }
        this.createProperty(name, this.getValueOf(name));
        this.outputHelperExpressions[name] = this.calculator.HelperExpression({ latex: name });
        this.outputHelperExpressions[name].observe('numericValue', function () {
            this.update();
            this.updateDependents();
        }.bind(this));
        this.outputProperties.push({
            name: name,
            type: 'number',
            displayName: name
        });
        this.outputList.update({
            outletProperties: this.outputProperties // should not be necessary
        });
        this.outputList.view.hide();
    }
    removeOutputVariable(name) {
        for (let prop of this.outputProperties) {
            if (prop['name'] == name) {
                remove(this.outputProperties, prop);
                break;
            }
        }
        this.outputList.update({
            outletProperties: this.outputProperties
        });
        this.outputList.view.hide();
    }
    update(args = {}, redraw = true) {
        // set the latex values of updated input variables contained
        this.updating = true;
        for (let [key, value] of Object.entries(args)) {
            let expr = this.getExpressionNamed(key);
            if (expr === null) {
                continue;
            }
            this.calculator.setExpression({
                id: expr['id'],
                latex: `${key}=${value}`
            });
        }
        for (let [id, expr] of Object.entries(this.expressions)) {
            let name = this.definedVariable(expr);
            if (name == null) {
                continue;
            }
            if (Object.keys(args).includes(name)) {
                continue;
            }
            if (!Object.keys(this.outputHelperExpressions).includes(name)) {
                continue;
            }
            let value = this.outputHelperExpressions[name].numericValue;
            args[name] = value;
        }
        super.update(args, redraw);
        this.updating = false;
    }
    linkFreeVariable(name) {
        let sliderExpr = this.getExpressionNamed(name);
        let id = sliderExpr['id'];
        let value = this[name] ?? 1;
        let secretInputExpr = this.calculator.setExpression({
            id: `secret_${id}`,
            latex: `${name}=${value}`,
            secret: true
        });
        this.secretInputExpressions[id] = secretInputExpr;
        this.calculator.setExpression({
            id: id,
            latex: name
        });
    }
    addedInputLink(link) {
        super.addedInputLink(link);
        this.linkFreeVariable(link.endHook.outlet.name);
    }
    unlinkFreeVariable(name) {
        let fixedExpr = this.getExpressionNamed(name);
        let id = fixedExpr['id'].split('secret_')[1];
        let value = this[name];
        delete this.secretInputExpressions[id];
        this.calculator.removeExpression({
            id: `secret_${id}`
        });
        this.calculator.setExpression({
            id: id,
            latex: `${name}=${value}`
        });
        // TODO: remove links to input variable
    }
    removedInputLink(link) {
        super.removedInputLink(link);
        let hook = link.endHook ?? link.previousHook;
        this.unlinkFreeVariable(hook.outlet.name);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosExpressionSheet.js.map