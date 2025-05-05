import { ToggleButton } from './ToggleButton.js';
export class ControlsButton extends ToggleButton {
    defaults() {
        return {
            messageKey: 'ctrl'
        };
    }
    setup() {
        super.setup();
        this.label.view['fill'] = 'black';
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ControlsButton.js.map