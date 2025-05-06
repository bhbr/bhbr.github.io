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
        for (let c of this.creations) {
            this.messages.push({ create: c });
        }
        super.setup();
    }
    labelFromMessage(msg) {
        return Object.values(msg)[0];
    }
    imageNameForIndex(index) {
        return (Object.values(this.messages[index] ?? {}) ?? ['key'])[0];
    }
}
//# sourceMappingURL=CreativeButton.js.map