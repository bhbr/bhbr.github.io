import { SidebarButton } from './SidebarButton.js';
export class CreativeButton extends SidebarButton {
    defaults() {
        return {
            creations: []
        };
    }
    mutabilities() {
        return {
            creations: 'on_init'
        };
    }
    setupMessages() {
        let newSelectMessages = [];
        let newDeselectMessages = [];
        for (let c of this.creations) {
            newSelectMessages.push({ create: c });
            newDeselectMessages.push({ create: 'draw' });
        }
        this.update({
            selectMessages: newSelectMessages,
            deselectMessages: newDeselectMessages
        });
    }
    labelFromMessage(msg) {
        return Object.values(msg)[0];
    }
    baseIconName() {
        return this.creations[0].replaceAll(' ', '_');
    }
    imageNameForIndex(index) {
        return (Object.values(this.selectMessages[index] ?? {}) ?? ['key'])[0];
    }
    updateHelpText() {
        // do nothing because the board handles it
    }
    getID() {
        if (this.creations.length > 0) {
            return this.creations[0];
        }
        else {
            return super.getID();
        }
    }
}
//# sourceMappingURL=CreativeButton.js.map