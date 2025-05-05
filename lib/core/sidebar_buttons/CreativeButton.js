import { SidebarButton } from './SidebarButton.js';
export class CreativeButton extends SidebarButton {
    defaults() {
        return {
            creations: [],
            outgoingMessage: { create: 'freehand' }
        };
    }
    mutabilities() {
        return {
            creations: 'on_init'
        };
    }
    setup() {
        super.setup();
        for (let c of this.creations) {
            this.messages.push({ create: c });
        }
    }
    labelFromMessage(msg) {
        return Object.values(msg)[0];
    }
}
//# sourceMappingURL=CreativeButton.js.map