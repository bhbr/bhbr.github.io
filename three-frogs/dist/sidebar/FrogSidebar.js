import { Sidebar } from '@bhbr/minter';
export class FrogSidebar extends Sidebar {
    defaults() {
        return {
            // List all the sidebar's buttons here, plus any other buttons that appear in the sidebars of any board that can be created from this sidebar (e. g. tools for a geometric construction). If none of the buttons here can create a board within the paper, no additional buttons must be listed.
            availableButtonClasses: [],
            // initialize the sidebar's buttons
            buttons: []
        };
    }
}
//# sourceMappingURL=FrogSidebar.js.map