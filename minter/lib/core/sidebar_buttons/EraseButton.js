import { SidebarButton } from './SidebarButton.js';
import { Color } from '../../core/classes/Color.js';
export class EraseButton extends SidebarButton {
    defaults() {
        return {
            baseColor: Color.red().brighten(0.7),
            messageKey: 'erase',
            selectMessages: [
                { 'erase': true },
                { 'restart': false }
            ],
            deselectMessages: [
                { 'erase': false },
                { 'restart': true }
            ],
            iconSize: 30
        };
    }
    setup() {
        super.setup();
        this.innerCircle.update({
            fillColor: Color.red().brighten(0.5)
        });
        this.label.update({
            backgroundColor: this.innerCircle.fillColor
        });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=EraseButton.js.map