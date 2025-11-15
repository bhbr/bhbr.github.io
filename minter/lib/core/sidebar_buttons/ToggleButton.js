import { SidebarButton } from './SidebarButton.js';
import { Color } from '../../core/classes/Color.js';
export class ToggleButton extends SidebarButton {
    defaults() {
        return {
            messageKey: 'key',
            baseColor: Color.gray(0.4),
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
            touchDownMessages: [message, message], // 2nd entry for locking
            touchUpMessages: [outgoingMessage]
        });
    }
    commonButtonUp() {
        if (this.currentModeIndex == 1) {
            if (this.locked) {
                super.commonButtonUp();
            }
            this.locked = !this.locked;
            this.view.transform.update({
                scale: 1
            });
            this.redraw();
        }
        else {
            super.commonButtonUp();
        }
        this.label.view.hide();
    }
    imageNameForIndex(index) {
        return this.messageKey;
    }
    labelFromMessage(msg) {
        if (this.currentModeIndex == 0) {
            return this.messageKey + ' &#9656;';
        }
        else {
            return '&#9666; lock';
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ToggleButton.js.map