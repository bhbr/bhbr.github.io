import { SidebarButton } from './SidebarButton.js';
import { BUTTON_SCALE_FACTOR } from './button_geometry.js';
import { Color } from '../../core/classes/Color.js';
export class ToggleButton extends SidebarButton {
    defaults() {
        return {
            messageKey: 'key',
            baseColor: Color.gray(0.8),
            locked: false
        };
    }
    setup() {
        super.setup();
        let message = {};
        message[this.messageKey] = true;
        let outgoingMessage = {};
        outgoingMessage[this.messageKey] = false;
        this.update({
            messages: [message, message], // 2nd entry for locking
            outgoingMessage: outgoingMessage
        });
    }
    commonButtonUp() {
        if (this.currentModeIndex == 1) {
            if (this.locked) {
                super.commonButtonUp();
            }
            this.locked = !this.locked;
        }
        else {
            super.commonButtonUp();
        }
    }
    updateLabel() {
        if (this.label == undefined) {
            return;
        }
        let f = this.active ? BUTTON_SCALE_FACTOR : 1;
        this.label.view.div.setAttribute('font-size', (f * this.baseFontSize).toString());
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ToggleButton.js.map