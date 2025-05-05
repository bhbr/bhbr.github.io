import { SpanningCreator } from '../../core/creators/SpanningCreator.js';
import { Board } from './Board.js';
export class BoardCreator extends SpanningCreator {
    createMobject() {
        let topLeft = this.topLeftVertex();
        let cm = new Board({
            compactAnchor: topLeft,
            compactWidth: this.getWidth(),
            compactHeight: this.getHeight()
        });
        cm.contractStateChange();
        cm.expandButton.view.show();
        return cm;
    }
    dissolve() {
        let w = this.getWidth();
        let h = this.getHeight();
        if (w < 25 || h < 25) {
            return;
        }
        super.dissolve();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BoardCreator.js.map