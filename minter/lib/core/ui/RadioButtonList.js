import { MGroup } from '../../core/mobjects/MGroup.js';
import { RadioButton } from './RadioButton.js';
export class RadioButtonList extends MGroup {
    defaults() {
        return {
            options: [],
            radioButtons: [],
            selectedButton: null,
            orientation: 'vertical',
            optionSpacing: 25,
            action: (text) => { }
        };
    }
    mutabilities() {
        return {
            options: 'on_init',
            orientation: 'on_init',
            optionSpacing: 'on_init'
        };
    }
    setup() {
        super.setup();
        var i = 0;
        for (let option of this.options) {
            let button = new RadioButton({
                list: this
            });
            button.label.update({
                text: option
            });
            switch (this.orientation) {
                case 'horizontal':
                    button.update({
                        anchor: [this.optionSpacing * i, 0]
                    });
                    break;
                case 'vertical':
                    button.update({
                        anchor: [0, this.optionSpacing * i]
                    });
                    break;
                default:
                    break;
            }
            this.add(button);
            this.radioButtons.push(button);
            i += 1;
        }
    }
    buttonSelected(button) {
        if (button == this.selectedButton) {
            return;
        }
        this.selectedButton = button;
        for (let anyButton of this.radioButtons) {
            if (anyButton !== button) {
                anyButton.unselect();
            }
        }
        this.action(button.label.text);
    }
}
//# sourceMappingURL=RadioButtonList.js.map