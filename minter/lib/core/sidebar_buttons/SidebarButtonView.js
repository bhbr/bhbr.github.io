import { VView } from '../../core/vmobjects/VView.js';
export class SidebarButtonView extends VView {
    setup() {
        super.setup();
        this.div.style.transformOrigin = `${this.radius}px ${this.radius}px`;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SidebarButtonView.js.map