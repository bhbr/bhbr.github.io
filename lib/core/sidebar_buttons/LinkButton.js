import { ToggleButton } from './ToggleButton.js';
export class LinkButton extends ToggleButton {
    defaults() {
        return {
            messageKey: 'link'
        };
    }
    setup() {
        super.setup();
        this.label.view['fill'] = 'black';
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=LinkButton.js.map