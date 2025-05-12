import { SidebarButton } from './SidebarButton.js';
import { Color } from '../../core/classes/Color.js';
export class RestartButton extends SidebarButton {
    defaults() {
        return {
            baseColor: Color.green(),
            baseFontSize: 36,
            messageKey: 'restart',
            messages: [],
            outgoingMessage: { restart: true }
        };
    }
    setup() {
        super.setup();
        this.label.update({
            text: '&circlearrowleft;'
        });
    }
    onPointerMove(e) { }
    mutabilities() { return {}; }
}
//# sourceMappingURL=RestartButton.js.map