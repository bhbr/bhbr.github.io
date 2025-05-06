import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { Frame } from './Frame.js';
import { Color } from '../../core/classes/Color.js';
import { DRAW_BORDERS } from '../../core/constants.js';
export class View extends ExtendedObject {
    defaults() {
        return {
            div: document.createElement('div'),
            frame: new Frame(),
            visible: true,
            opacity: 1.0,
            backgroundColor: Color.clear(),
            drawBorder: DRAW_BORDERS,
            drawShadow: false,
            savedDrawShadow: null,
            mobject: null
        };
    }
    // this.anchor is a synonym for this.frame.anchor
    get anchor() {
        return this.frame.anchor;
    }
    set anchor(newValue) {
        this.frame.anchor = newValue;
    }
    // this.transform is a synonym for this.frame.transform
    get transform() {
        return this.frame.transform;
    }
    set transform(newValue) {
        this.frame.transform = newValue;
    }
    get frameWidth() {
        return this.frame.width;
    }
    set frameWidth(newValue) {
        this.frame.width = newValue;
    }
    get frameHeight() {
        return this.frame.height ?? 0;
    }
    set frameHeight(newValue) {
        this.frame.height = newValue;
    }
    // parent view = view of the mobject's parent
    // (not settable because that is the mobject's responsibility)
    get parent() {
        return this.mobject?.parent?.view;
    }
    setup() {
        if (this.mobject) {
            this.div.setAttribute('class', 'mobject-div ' + this.mobject.constructor.name);
        }
        else {
            this.div.setAttribute('class', 'mobject-div ' + this.constructor.name);
        }
        this.div.style.transformOrigin = 'top left';
        this.div.style.position = 'absolute';
        // 'absolute' positions this mobject relative (sic) to its parent
        this.div.style.overflow = 'visible';
        // by default, the mobject can draw outside its view's borders
        this.div.style.border = this.drawBorder ? '1px dashed green' : 'none';
        this.div['view'] = this;
        this.frame.view = this;
        this.redraw();
        if (this.drawShadow) {
            this.showShadow();
        }
    }
    // called by mobject.add
    add(subView) {
        subView.setup();
        this.div.appendChild(subView.div);
    }
    redraw() {
        this.div.style.transform = this.transform.withoutAnchor().toCSSString();
        this.div.style.left = `${this.anchor[0].toString()}px`;
        this.div.style.top = `${this.anchor[1].toString()}px`;
        this.div.style.width = `${this.frame.width.toString()}px`;
        this.div.style.height = `${this.frame.height.toString()}px`;
        this.div.style.backgroundColor = this.backgroundColor.toCSS();
        this.div.style.opacity = this.opacity.toString();
        this.setVisibility(this.shouldBeDrawn());
    }
    // TODO: put into setter for this.visible?
    setVisibility(visibility) {
        this.div.style.visibility = visibility ? 'visible' : 'hidden';
        for (let submob of this.mobject?.submobs ?? []) {
            submob.view.setVisibility(submob.view.visible && visibility);
        }
    }
    showShadow() {
        if (this.savedDrawShadow !== null) {
            this.drawShadow = this.savedDrawShadow;
        }
        this.savedDrawShadow = null;
        if (this.drawShadow) {
            this.div.style.filter = 'drop-shadow(2px 2px 5px)';
        }
    }
    hideShadow() {
        this.savedDrawShadow = this.drawShadow;
        this.drawShadow = false;
        this.div.style.filter = '';
    }
    shouldBeDrawn() {
        if (!this.visible) {
            return false;
        }
        for (let v of this.superViews()) {
            if (!v.visible) {
                return false;
            }
        }
        return true;
    }
    superViews() {
        return this.mobject?.ancestors().map((mob) => mob.view) ?? [];
    }
    // Show and hide //
    show() {
        this.visible = true;
        this.setVisibility(this.visible);
    }
    hide() {
        this.visible = false;
        this.setVisibility(this.visible);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=View.js.map