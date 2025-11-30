export class MinterMathNode {
    value(scope = {}) {
        return NaN;
    }
    variables() {
        return [];
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MinterSymbolNode extends MinterMathNode {
    constructor(name) {
        super();
        this.name = name;
    }
    value(scope = {}) {
        switch (this.name) {
            case 'tau':
                return 2 * Math.PI;
            case 'pi':
                return Math.PI;
            case 'e':
                return scope['e'] ?? Math.E;
            default:
                return scope[this.name] ?? NaN;
        }
    }
    variables() {
        if (['tau', 'pi', 'e'].includes(this.name)) {
            return [];
        }
        return [this.name];
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MinterConstantNode extends MinterMathNode {
    constructor(value) {
        super();
        this._value = value;
    }
    value(scope = {}) {
        return this._value;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MinterAssignmentNode extends MinterMathNode {
    constructor(symbol, child) {
        super();
        this.symbol = symbol;
        this.child = child;
    }
    get name() {
        return this.symbol.name;
    }
    value(scope = {}) {
        return this.child.value(scope);
    }
    variables() {
        return this.child.variables();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MinterFunctionNode extends MinterMathNode {
    constructor(name, child) {
        super();
        this.name = name;
        this.child = child;
    }
    variables() {
        return this.child.variables();
    }
    value(scope = {}) {
        let a = this.child.value(scope);
        switch (this.name) {
            case 'sin':
                return Math.sin(a);
            case 'cos':
                return Math.cos(a);
            case 'tan':
                return Math.tan(a);
            case 'cot':
                return 1 / Math.tan(a);
            case 'sec':
                return 1 / Math.cos(a);
            case 'csc':
                return 1 / Math.sin(a);
            case 'asin':
            case 'arcsin':
                return Math.asin(a);
            case 'acos':
            case 'arccos':
                return Math.acos(a);
            case 'atan':
            case 'arctan':
                return Math.atan(a);
            case 'sinh':
                return Math.sinh(a);
            case 'cosh':
                return Math.cosh(a);
            case 'tanh':
                return Math.tanh(a);
            case 'sqrt':
                return Math.sqrt(a);
            case 'log':
                return Math.log10(a);
            case 'ln':
                return Math.log(a);
            case 'exp':
                return Math.exp(a);
            default:
                return NaN;
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MinterOperatorNode extends MinterMathNode {
    constructor(name, children) {
        super();
        this.name = name;
        this.children = children;
    }
    variables() {
        let vars1 = this.children[0].variables();
        let vars2 = this.children[1].variables();
        return vars1.concat(vars2).sort();
    }
    value(scope = {}) {
        let a = this.children[0].value(scope);
        let b = this.children[1].value(scope);
        switch (this.name) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            case '^':
                return a ** b;
            default:
                return NaN;
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=MinterMathNode.js.map