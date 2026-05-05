import { InputBox } from './InputBox.js';
export class TextInputBox extends InputBox {
    get value() {
        return this.inputElement.value;
    }
    set value(newValue) {
        this.inputElement.value = newValue;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=TextInputBox.js.map