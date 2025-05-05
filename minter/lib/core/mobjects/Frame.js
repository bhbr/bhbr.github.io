import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { vertexOrigin } from '../../core/functions/vertex.js';
import { Transform } from '../../core/classes/Transform.js';
export class Frame extends ExtendedObject {
    defaults() {
        return {
            // position
            transform: Transform.identity(),
            anchor: vertexOrigin(),
            width: 100,
            height: 100,
            view: null
        };
    }
    // this.anchor is a synonym for this.transform.anchor
    get anchor() {
        return this.transform.anchor;
    }
    set anchor(newValue) {
        this.transform.anchor = newValue;
    }
    get parent() {
        return this.view?.parent.frame ?? null;
    }
    relativeTransform(frame) {
        /*
        What transform maps (actively) from the given
        ancestor Frame ('frame') to this descendant Frame?
        If the transforms in between are all just anchor
        translations, this gives this Frame's anchor
        in the coordinate frame of the given Frame.
        */
        // If there is no frame, use the direct parent's coordinate frame.
        // If there is no parent yet, use your own (local) coordinates.
        let frame_ = frame || this;
        let t = Transform.identity();
        let fr = this;
        while (fr && fr.transform instanceof Transform) {
            if (fr == frame_) {
                return t;
            }
            t.leftComposeWith(new Transform({ shift: fr.anchor }));
            t.leftComposeWith(fr.transform);
            fr = fr.parent;
        }
        throw 'relativeTransform requires a direct ancestor';
    }
    transformLocalPoint(point, frame) {
        /*
        Given a point (Vertex) in local coordinates,
        compute its coordinates in the given ancestor
        Frame's frame.
        */
        let t = this.relativeTransform(frame);
        return t.appliedTo(point);
    }
    /*
    The following geometric properties are first computed from the view frame.
    The versions without 'view' in the name can be overriden by subclasses,
    e. g. VMobjects.
    */
    viewULCorner(frame) {
        return this.transformLocalPoint(vertexOrigin(), frame);
    }
    viewURCorner(frame) {
        return this.transformLocalPoint([this.width, 0], frame);
    }
    viewLLCorner(frame) {
        return this.transformLocalPoint([0, this.height], frame);
    }
    viewLRCorner(frame) {
        return this.transformLocalPoint([this.width, this.height], frame);
    }
    viewXMin(frame) { return this.viewULCorner(frame)[0]; }
    viewXMax(frame) { return this.viewLRCorner(frame)[0]; }
    viewYMin(frame) { return this.viewULCorner(frame)[1]; }
    viewYMax(frame) { return this.viewLRCorner(frame)[1]; }
    viewCenter(frame) {
        let p = this.transformLocalPoint([this.width / 2, this.height / 2], frame);
        return p;
    }
    viewMidX(frame) { return this.viewCenter(frame)[0]; }
    viewMidY(frame) { return this.viewCenter(frame)[1]; }
    viewLeftCenter(frame) { return [this.viewXMin(frame), this.viewMidY(frame)]; }
    viewRightCenter(frame) { return [this.viewXMax(frame), this.viewMidY(frame)]; }
    viewTopCenter(frame) { return [this.viewMidX(frame), this.viewYMin(frame)]; }
    viewBottomCenter(frame) { return [this.viewMidX(frame), this.viewYMax(frame)]; }
    /*
    Equivalent (by default) versions without "view" in the name
    These can be overriden in subclasses, e. g. in VFrame using
    its vertices.
    */
    ulCorner(frame) { return this.viewULCorner(frame); }
    urCorner(frame) { return this.viewURCorner(frame); }
    llCorner(frame) { return this.viewLLCorner(frame); }
    lrCorner(frame) { return this.viewLRCorner(frame); }
    xMin(frame) { return this.viewXMin(frame); }
    xMax(frame) { return this.viewXMax(frame); }
    yMin(frame) { return this.viewYMin(frame); }
    yMax(frame) { return this.viewYMax(frame); }
    center(frame) { return this.viewCenter(frame); }
    midX(frame) { return this.viewMidX(frame); }
    midY(frame) { return this.viewMidY(frame); }
    leftCenter(frame) { return this.viewLeftCenter(frame); }
    rightCenter(frame) { return this.viewRightCenter(frame); }
    topCenter(frame) { return this.viewTopCenter(frame); }
    bottomCenter(frame) { return this.viewBottomCenter(frame); }
    // Local versions (relative to own coordinate system)
    localULCorner() { return this.ulCorner(this); }
    localURCorner() { return this.urCorner(this); }
    localLLCorner() { return this.llCorner(this); }
    localLRCorner() { return this.lrCorner(this); }
    localXMin() { return this.xMin(this); }
    localXMax() { return this.xMax(this); }
    localYMin() { return this.yMin(this); }
    localYMax() { return this.yMax(this); }
    localCenter() { return this.center(this); }
    localMidX() { return this.midX(this); }
    localMidY() { return this.midY(this); }
    localLeftCenter() { return this.leftCenter(this); }
    localRightCenter() { return this.rightCenter(this); }
    localTopCenter() { return this.topCenter(this); }
    localBottomCenter() { return this.bottomCenter(this); }
    getWidth() { return this.localXMax() - this.localXMin(); }
    getHeight() { return this.localYMax() - this.localYMin(); }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Frame.js.map