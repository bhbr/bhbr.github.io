import { vertexOrigin } from '../../../../core/functions/vertex.js';
import { Creator } from '../../../../core/creators/Creator.js';
import { BoxSlider } from './BoxSlider.js';
import { Color } from '../../../../core/classes/Color.js';
export class BoxSliderCreator extends Creator {
    setup() {
        super.setup();
        this.update({
            creation: this.createMobject(),
            anchor: this.getStartPoint()
        });
        if (this.creation == null) {
            return;
        }
        this.add(this.creation);
        this.creation.hideLinks();
    }
    createMobject() {
        return this.creation || new BoxSlider({ height: 0 });
    }
    updateFromTip(q, redraw = true) {
        if (this.creation === null) {
            return;
        }
        this.creation.update({
            height: q[1] - this.getStartPoint()[1],
        }, redraw);
        this.creation.filledBar.update({
            fillColor: Color.gray(0.5)
        }, redraw);
        this.creation.hideLinks();
        if (redraw) {
            this.view.redraw();
        }
    }
    dissolve() {
        super.dissolve();
        if (this.creation === null) {
            return;
        }
        this.creation.update({
            anchor: this.view.frame.anchor,
            frameHeight: this.creation.height
        });
        this.creation.outerBar.update({ anchor: vertexOrigin() }); // necessary?
        this.creation.label.update({
            anchor: [this.creation.width / 2 - this.creation.label.view.frame.width / 2, this.creation.height / 2 - this.creation.label.view.frame.height / 2]
        });
        this.creation.outputList.positionSelf();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BoxSliderCreator.js.map