import { Mobject } from '../../core/mobjects/Mobject.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class Creator extends Mobject {
    defaults() {
        return {
            creationStroke: [],
            creation: null,
            screenEventHandler: ScreenEventHandler.Self,
            helpText: ''
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
        return this.creationStroke[0] ?? this.view.frame.anchor;
    }
    getEndPoint() {
        return this.creationStroke[this.creationStroke.length - 1] ?? this.view.frame.anchor;
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
        return new Mobject();
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