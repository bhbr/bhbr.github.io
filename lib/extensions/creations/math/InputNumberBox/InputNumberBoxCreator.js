import { LinkableInputNumberBox } from './InputNumberBox.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class InputNumberBoxCreator extends DraggingCreator {
    createMobject() {
        return new LinkableInputNumberBox({
            anchor: this.getStartPoint()
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        this.creation.hideLinks();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=InputNumberBoxCreator.js.map