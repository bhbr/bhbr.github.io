import { InputBox } from './InputBox.js';
export class NumberInputBox extends InputBox {
    get value() {
        return Number(this.inputElement.value);
    }
    set value(newValue) {
        let isFalsy = [null, undefined, NaN, Infinity, -Infinity].includes(newValue);
        this.inputElement.value = isFalsy ? '' : newValue.toString();
    }
    setup() {
        super.setup();
        //this.inputElement.setAttribute('type', 'number')
        // needs adjustment for iPad
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=NumberInputBox.js.map