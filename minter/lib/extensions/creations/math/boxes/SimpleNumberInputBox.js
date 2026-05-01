import { SimpleInputBox } from './SimpleInputBox.js';
export class SimpleNumberInputBox extends SimpleInputBox {
    get value() {
        return Number(this.inputElement.value);
    }
    set value(newValue) {
        let isFalsy = [null, undefined, NaN, Infinity, -Infinity].includes(newValue);
        this.inputElement.value = isFalsy ? '' : newValue.toString();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SimpleNumberInputBox.js.map