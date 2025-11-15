import { Creator } from './Creator.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
export class SpanningCreator extends Creator {
    defaults() {
        return {
            rectangle: new Rectangle()
        };
    }
    mutabilities() {
        return {
            rectangle: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.rectangle);
        //this.addDependency('topLeftVertex', this.rectangle, 'anchor')
        this.addDependency('getWidth', this.rectangle, 'width');
        this.addDependency('getHeight', this.rectangle, 'height');
    }
    topLeftVertex() {
        return [
            Math.min(this.getStartPoint()[0], this.getEndPoint()[0]),
            Math.min(this.getStartPoint()[1], this.getEndPoint()[1])
        ];
    }
    getWidth() {
        return Math.abs(this.getStartPoint()[0] - this.getEndPoint()[0]);
    }
    getHeight() {
        return Math.abs(this.getStartPoint()[1] - this.getEndPoint()[1]);
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, false);
        this.update({
            frameWidth: this.getWidth(),
            frameHeight: this.getHeight()
        });
        if (redraw) {
            this.view.redraw();
        }
    }
    dissolve() {
        let w = this.getWidth();
        let h = this.getHeight();
        if (this.creation) {
            this.remove(this.creation);
        }
        this.creation = this.createMobject();
        this.creation.update({
            anchor: this.topLeftVertex(),
            frameWidth: w,
            frameHeight: h
        });
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
}
//# sourceMappingURL=SpanningCreator.js.map