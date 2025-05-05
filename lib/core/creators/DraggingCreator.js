import { Creator } from './Creator.js';
import { Color } from '../../core/classes/Color.js';
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
                fillOpacity: 1.0,
                anchor: this.creationStroke[0]
            })
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, false);
        this.creation.update({
            anchor: q
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
            anchor: this.getEndPoint()
        });
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DraggingCreator.js.map