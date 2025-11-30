import { Mobject } from '../../core/mobjects/Mobject.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { vertexAdd } from '../../core/functions/vertex.js';
export class Creator extends Mobject {
    defaults() {
        return {
            creationStroke: [],
            creation: null,
            screenEventHandler: ScreenEventHandler.Self,
            helpText: '',
            pointOffset: [0, 0]
        };
    }
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    setup() {
        super.setup();
        this.update({
            anchor: this.getStartPoint()
        });
    }
    getStartPoint() {
        return vertexAdd(this.creationStroke[0] ?? this.view.frame.anchor, this.pointOffset);
    }
    getEndPoint() {
        return vertexAdd(this.creationStroke[this.creationStroke.length - 1] ?? this.view.frame.anchor, this.pointOffset);
    }
    dissolve() {
        this.remove(this.creation);
        this.creation = this.createMobject();
        this.creation.update({
            anchor: this.getStartPoint()
        }, true);
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
    createMobject() {
        return new Mobject({
            anchor: this.pointOffset
        });
    }
    updateFromTip(q, redraw = true) {
        this.creationStroke.push(q);
        this.updateDependents();
        if (redraw) {
            this.view.redraw();
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Creator.js.map