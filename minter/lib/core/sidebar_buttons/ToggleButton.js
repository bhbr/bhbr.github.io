import { SidebarButton } from './SidebarButton.js';
import { Color } from '../../core/classes/Color.js';
export class ToggleButton extends SidebarButton {
    defaults() {
        return {
            baseColor: Color.gray(0.3),
            lockColor: Color.gray(0.6),
            locked: false,
            messageKey: 'toggle'
        };
    }
    setup() {
        super.setup();
        this.innerCircle.update({
            fillColor: this.baseColor
        });
        this.label.update({
            backgroundColor: this.lockColor,
            borderColor: Color.gray(0.8)
        });
    }
    setupMessages() {
        let message = {};
        message[this.messageKey] = true;
        let outgoingMessage = {};
        outgoingMessage[this.messageKey] = false;
        this.update({
            selectMessages: [message],
            deselectMessages: [outgoingMessage]
        });
    }
    baseMessageKey() {
        return this.messageKey;
    }
    imageNameForIndex(index) {
        return this.messageKey;
    }
    commonButtonDown() {
        super.commonButtonDown();
        this.innerCircle.update({
            fillColor: this.lockColor
        });
    }
    commonMereButtonUp() {
        this.messagePaper(this.deselectMessages[0]);
        this.touchStartTime = null;
        this.sidebar.setActiveButton(null);
        this.innerCircle.update({
            fillColor: this.baseColor
        });
        this.label.view.hide();
    }
    commonButtonTap() {
        if (this.sidebar.activeButton != this) {
            return;
        }
        if (this.locked) {
            this.messagePaper(this.deselectMessages[0]);
        }
        else {
            this.messagePaper(this.selectMessages[0]);
        }
        this.messagePaper({ 'show help': false });
        this.touchStartTime = null;
        this.locked = !this.locked;
        this.innerCircle.update({
            fillColor: this.locked ? this.lockColor : this.baseColor
        });
        this.label.view.hide();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ToggleButton.js.map