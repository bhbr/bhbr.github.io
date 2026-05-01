import { Creator } from './Creator.js';
import { Color } from '../../core/classes/Color.js';
import { vertexAdd, vertexSubtract } from '../../core/functions/vertex.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
import { VView } from '../../core/vmobjects/VView.js';
export class DraggingCreator extends Creator {
    setup() {
        super.setup();
        this.creation = this.createMobject();
        this.add(this.creation);
    }
    createMobject() {
        return new Rectangle({
            width: 50,
            height: 50,
            view: new VView({
                fillColor: Color.red(),
                fillOpacity: 1.0
            }),
            anchor: this.pointOffset
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, false);
        this.creation.update({
            anchor: vertexAdd(vertexSubtract(q, this.getStartPoint()), this.pointOffset)
        }, redraw);
        if (redraw) {
            this.view.redraw();
        }
    }
    dissolve() {
        if (this.creation === null) {
            return;
        }
        this.creation.update({
            anchor: vertexAdd(this.creation.anchor, this.anchor)
        });
        this.remove(this.creation);
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DraggingCreator.js.map