import { Linkable } from '../../../core/linkables/Linkable.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
import { getPaper, getSidebar } from '../../../core/functions/getters.js';
import { Lexer } from './Lexer.js';
import { Parser } from './Parser.js';
import { remove } from '../../../core/functions/arrays.js';
import { MinterAssignmentNode } from './MinterMathNode.js';
import { TextLabel } from '../../../core/mobjects/TextLabel.js';
export class MathQuillFormula extends Linkable {
    defaults() {
        return {
            frameWidth: 100,
            frameHeight: 50,
            screenEventHandler: ScreenEventHandler.Self,
            MQ: null,
            mathField: null,
            span: null,
            scope: {},
            parser: new Parser([]),
            outputProperties: [{
                    name: 'value',
                    type: 'number',
                    displayName: 'value'
                }],
            value: 0,
            resultBox: new TextLabel(),
        };
    }
    setup() {
        super.setup();
        if (!getPaper().loadedAPIs.includes('mathquill')) {
            this.loadMathQuillAPI();
        }
        else {
            this.createMathField();
        }
        this.boundKeyPressed = this.keyPressed.bind(this);
        this.view.div.addEventListener('keydown', this.boundKeyPressed.bind(this));
        this.add(this.resultBox);
    }
    mathFieldWidth() {
        if (!this.span) {
            return 0;
        }
        return this.span.clientWidth;
    }
    resultBoxAnchor() {
        return [this.mathFieldWidth(), 0];
    }
    loadMathQuillAPI() {
        let cssLinkTag = document.createElement('link');
        cssLinkTag.rel = 'stylesheet';
        cssLinkTag.href = '../../mathquill-0.10.1/mathquill.css';
        cssLinkTag.onload = function () {
            let jQueryScriptTag = document.createElement('script');
            jQueryScriptTag.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
            jQueryScriptTag.onload = function () {
                let mqScriptTag = document.createElement('script');
                mqScriptTag.type = 'text/javascript';
                mqScriptTag.src = '../../mathquill-0.10.1/mathquill.js';
                mqScriptTag.onload = this.createMathField.bind(this);
                document.head.append(mqScriptTag);
            }.bind(this);
            document.head.append(jQueryScriptTag);
        }.bind(this);
        document.head.append(cssLinkTag);
    }
    createMathField() {
        this.MQ = MathQuill.getInterface(2);
        let p = document.createElement('p');
        this.span = document.createElement('span');
        this.span.style.color = 'white';
        this.span.style.backgroundColor = this.backgroundColor.toCSS();
        this.span.style.border = '2px solid white';
        p.append(this.span);
        this.view.div.append(p);
        this.mathField = this.MQ.MathField(this.span, {
            handlers: {
                edit: function () {
                    this.updateIOProperties();
                    this.updateValue();
                    this.updateResultBox();
                    this.updateLayout();
                }.bind(this)
            }
        });
        this.mathField.write('y=x');
        this.updateIOProperties();
        this.update({
            frameWidth: this.span.clientWidth,
            frameHeight: this.span.clientHeight
        });
    }
    onPointerDown(e) {
        this.focus();
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
    boundDectivateKeyboard() { }
    boundKeyPressed(e) { }
    keyPressed(e) {
        this.updateLayout();
        if (e.key == '13' || e.key == 'Enter' || e.key == 'Return') {
            this.blur();
        }
    }
    focus() {
        super.focus();
        this.mathField.focus();
        this.activateKeyboard();
        getPaper().sensor.savedOnPointerUp = getPaper().sensor.onPointerUp;
        getPaper().sensor.onPointerUp = this.blur.bind(this);
    }
    blur() {
        super.blur();
        this.mathField.blur();
        this.deactivateKeyboard();
        getPaper().sensor.onPointerUp = getPaper().sensor.savedOnPointerUp;
        getPaper().sensor.savedOnPointerUp = function (e) { };
    }
    updateIOProperties() {
        try {
            let tokens = this.parser.lexer.tokenizeTex(this.mathField.latex());
            this.parser.tokens = tokens;
        }
        catch (ParseError) {
            return;
        }
        try {
            let node = this.parser.parseTokens(this.parser.tokens);
            let variables = node.variables();
            let inputNames = this.inputNames();
            for (let v of variables) {
                if (!inputNames.includes(v)) {
                    this.createInputVariable(v, NaN);
                }
            }
            for (let v of inputNames) {
                if (!variables.includes(v)) {
                    this.removeInputVariable(v);
                }
            }
            if (node instanceof MinterAssignmentNode) {
                if (this.outputNames()[0] !== node.name) {
                    this.createOutputVariable(node.name);
                }
            }
        }
        catch (ParseError) {
            return;
        }
    }
    computeValue() {
        if (!this.mathField) {
            return NaN;
        }
        let latex = this.mathField.latex();
        let lexer = new Lexer();
        let tokens = lexer.tokenizeTex(latex);
        try {
            let node = this.parser.parseTokens(tokens);
            let result = this.parser.evaluateTex(latex, this.scope);
            return result;
        }
        catch (ParseError) {
            return NaN;
        }
    }
    updateValue() {
        let prop = this.outputPropertyName();
        let value = this.computeValue();
        this[prop] = value;
        this.value = value;
    }
    outputPropertyName() {
        return this.outputNames()[0];
    }
    resultBoxText() {
        if (isNaN(this.value)) {
            return '';
        }
        return `=${this.value}`;
    }
    updateResultBox() {
        this.resultBox.update({
            anchor: this.resultBoxAnchor(),
            text: this.resultBoxText()
        });
    }
    updateLayout() {
        this.update({
            frameWidth: this.span.clientWidth,
            frameHeight: this.span.clientHeight + 30
        });
        this.positionIOLists();
    }
    createInputVariable(name, value) {
        this.createProperty(name, value);
        this.inputProperties.push({
            name: name,
            type: 'number',
            displayName: name
        });
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.positionIOLists();
        this.inputList.view.hide();
    }
    removeInputVariable(name) {
        if (name == null) {
            return;
        }
        this.removeProperty(name);
        for (let prop of this.inputProperties) {
            if (prop['name'] == name) {
                remove(this.inputProperties, prop);
                break;
            }
        }
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.positionIOLists();
        this.inputList.view.hide();
    }
    createOutputVariable(name) {
        if (name == null) {
            return;
        }
        this.createProperty(name, 0);
        this.outputProperties = [{
                name: name,
                type: 'number',
                displayName: name
            }];
        this.outputList.update({
            outletProperties: this.outputProperties // should not be necessary
        });
        this.positionIOLists();
        this.outputList.view.hide();
    }
    removeOutputVariable() {
        this.outputProperties = [{
                name: 'value',
                type: 'number',
                displayName: 'value'
            }];
        this.outputList.update({
            outletProperties: this.outputProperties // should not be necessary
        });
        this.positionIOLists();
        this.outputList.view.hide();
    }
    update(args = {}, redraw = true) {
        for (let v of this.inputNames()) {
            if (Object.keys(args).includes(v)) {
                this.scope[v] = args[v];
            }
        }
        this.updateValue();
        this.updateResultBox();
        super.update(args, redraw);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=MathQuillFormula.js.map