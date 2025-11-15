import { SidebarButton } from './SidebarButton.js';
export class CreativeButton extends SidebarButton {
    defaults() {
        return {
            creations: [],
            touchUpMessages: [{ create: 'draw' }]
        };
    }
    mutabilities() {
        return {
            creations: 'on_init'
        };
    }
    setup() {
        for (let c of this.creations) {
            this.touchDownMessages.push({ create: c });
        }
        super.setup();
    }
    labelFromMessage(msg) {
        var key = Object.values(msg)[0];
        if (this.currentModeIndex > 0) {
            key = '&#9666; ' + key;
        }
        if (this.currentModeIndex < this.creations.length - 1) {
            key = key + ' &#9656;';
        }
        return key;
    }
    imageNameForIndex(index) {
        return (Object.values(this.touchDownMessages[index] ?? {}) ?? ['key'])[0];
    }
}
//# sourceMappingURL=CreativeButton.js.map