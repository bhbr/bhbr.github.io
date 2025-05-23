import { NumberBox } from './NumberBox.js';
import { NumberListBox } from './NumberListBox.js';
import { Linkable } from '../../core/linkables/Linkable.js';
import { Circle } from '../../core/shapes/Circle.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { Color } from '../../core/classes/Color.js';
export class BinaryOperatorBox extends Linkable {
    defaults() {
        return {
            operatorDict: { "+": "+", "–": "–", "&times;": "&times;", "/": "/" },
            operatorSign: new Circle({
                radius: 10,
                fillColor: Color.black(),
                fillOpacity: 1.0
            }),
            operatorLabel: new TextLabel(),
            operator: undefined,
            operand1: 0,
            operand2: 0,
            valueType: 'number',
            valueBox: new NumberBox(),
            inputProperties: [
                { name: 'operand1', displayName: null, type: 'number|Array<number>' },
                { name: 'operand2', displayName: null, type: 'number|Array<number>' }
            ],
            outputProperties: [
                { name: 'result', displayName: null, type: 'number|Array<number>' }
            ]
        };
    }
    mutabilities() {
        return {
            operatorDict: 'in_subclass',
            operatorSign: 'never',
            operatorLabel: 'never',
            operator: 'on_init'
        };
    }
    setup() {
        super.setup();
        this.add(this.valueBox);
        this.update({
            frameWidth: this.valueBox.frameWidth,
            frameHeight: this.valueBox.frameHeight,
        });
        this.operatorSign.update({
            midpoint: [this.view.frame.width / 2, 0]
        });
        this.operatorLabel.update({
            text: this.operatorDict[this.operator],
            frameWidth: 2 * this.operatorSign.radius,
            frameHeight: 2 * this.operatorSign.radius
        });
        this.operatorLabel.view.div.style.fontSize = '14px';
        this.operatorSign.add(this.operatorLabel);
        this.add(this.operatorSign);
    }
    setValueTypeTo(newType) {
        if (this.valueType == 'number' && newType == 'Array<number>') {
            this.remove(this.valueBox);
            this.valueBox = new NumberListBox({
                value: this.result()
            });
        }
        else if (this.valueType == 'Array<number>' && newType == 'number') {
            this.remove(this.valueBox);
            this.valueBox = new NumberBox({
                value: this.result()
            });
        }
        else {
            return;
        }
        this.add(this.valueBox);
        this.moveToTop(this.operatorSign);
    }
    result() {
        let a = this.operand1;
        let b = this.operand2;
        return this.compute(a, b, this.operator);
    }
    compute(a, b, op) {
        if (typeof a == 'number' && typeof b == 'number') {
            return this.computeNumberAndNumber(a, b, op);
        }
        else if (a instanceof Array && typeof b == 'number') {
            return this.computeArrayAndNumber(a, b, op);
        }
        else if (typeof a == 'number' && b instanceof Array) {
            return this.computeNumberAndArray(a, b, op);
        }
        else if (a instanceof Array && b instanceof Array) {
            return this.computeArrayAndArray(a, b, op);
        }
    }
    computeNumberAndNumber(a, b, op) {
        switch (op) {
            case "+":
                return a + b;
            case "–":
                return a - b;
            case "&times;":
                return a * b;
            case "/":
                return a / b;
        }
    }
    computeArrayAndNumber(a, b, op) {
        return a.map((v) => this.compute.bind(this)(v, b, op));
    }
    computeNumberAndArray(a, b, op) {
        return b.map((v) => this.compute.bind(this)(a, v, op));
    }
    computeArrayAndArray(a, b, op) {
        if (a.length != b.length) {
            return [];
        }
        let r = [];
        for (var i = 0; i < a.length; i++) {
            r.push(this.computeNumberAndNumber(a[i], b[i], op));
        }
        return r;
    }
    update(args = {}, redraw = true) {
        let oldOp1Type = typeof this.operand1;
        let oldOp2Type = typeof this.operand2;
        super.update(args, redraw);
        if (typeof this.operand1 != oldOp1Type || typeof this.operand2 != oldOp2Type) {
            if (typeof this.operand1 == 'number' && typeof this.operand2 == 'number') {
                this.setValueTypeTo('number');
            }
            else {
                this.setValueTypeTo('Array<number>');
            }
        }
        this.valueBox.update({ value: this.result() }, redraw);
    }
}
export class AddBox extends BinaryOperatorBox {
    defaults() {
        return {
            operator: '+',
            inputProperties: [
                { name: 'operand1', displayName: 'term', type: 'number|Array<number>' },
                { name: 'operand2', displayName: 'term', type: 'number|Array<number>' }
            ],
            outputProperties: [
                { name: 'result', displayName: 'sum', type: 'number|Array<number>' }
            ]
        };
    }
    mutabilities() {
        return {
            operator: 'never'
        };
    }
}
export class SubtractBox extends BinaryOperatorBox {
    defaults() {
        return {
            operator: '–',
            inputProperties: [
                { name: 'operand1', displayName: 'minuend', type: 'number|Array<number>' },
                { name: 'operand2', displayName: 'subtrahend', type: 'number|Array<number>' }
            ],
            outputProperties: [
                { name: 'result', displayName: 'difference', type: 'number|Array<number>' }
            ]
        };
    }
    mutabilities() {
        return {
            operator: 'never'
        };
    }
}
export class MultiplyBox extends BinaryOperatorBox {
    defaults() {
        return {
            operator: '&times;',
            inputProperties: [
                { name: 'operand1', displayName: 'factor', type: 'number|Array<number>' },
                { name: 'operand2', displayName: 'factor', type: 'number|Array<number>' }
            ],
            outputProperties: [
                { name: 'result', displayName: 'product', type: 'number|Array<number>' }
            ]
        };
    }
    mutabilities() {
        return {
            operator: 'never'
        };
    }
}
export class DivideBox extends BinaryOperatorBox {
    defaults() {
        return {
            operator: '/',
            inputProperties: [
                { name: 'operand1', displayName: 'dividend', type: 'number|Array<number>' },
                { name: 'operand2', displayName: 'divisor', type: 'number|Array<number>' }
            ],
            outputProperties: [
                { name: 'result', displayName: 'quotient', type: 'number|Array<number>' }
            ]
        };
    }
    mutabilities() {
        return {
            operator: 'never'
        };
    }
}
//# sourceMappingURL=BinaryOperatorBox.js.map