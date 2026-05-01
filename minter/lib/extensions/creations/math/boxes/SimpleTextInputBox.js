import { SimpleInputBox } from './SimpleInputBox.js';
export class SimpleTextInputBox extends SimpleInputBox {
    get value() {
        return this.inputElement.value;
    }
    set value(newValue) {
        this.inputElement.value = newValue;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SimpleTextInputBox.js.map