import { TextInputBox } from '../../../../extensions/ui/InputBox/TextInputBox.js';
import { getPaper } from '../../../../core/functions/getters.js';
export class VariableNameBox extends TextInputBox {
    keyPressed(e) {
        super.keyPressed(e);
        if (e.which != 13) {
            return;
        }
        if (this.inputElement.value.length == 1) {
            this.inputElement.blur();
            getPaper().activeKeyboard = true;
            this.onReturn();
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VariableNameBox.js.map