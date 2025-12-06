import { Mobject } from '../../core/mobjects/Mobject.js';
import { MGroup } from '../../core/mobjects/MGroup.js';
import { addPointerDown, addPointerMove, addPointerUp, removePointerDown, removePointerMove, removePointerUp } from '../../core/mobjects/screen_events.js';
import { VView } from './VView.js';
export class VMobject extends Mobject {
    defaults() {
        return {
            view: new VView(),
            vertices: []
        };
    }
    get fillColor() { return this.view.fillColor; }
    set fillColor(newValue) { this.view.fillColor = newValue; }
    get fillOpacity() { return this.view.fillOpacity; }
    set fillOpacity(newValue) { this.view.fillOpacity = newValue; }
    get strokeColor() { return this.view.strokeColor; }
    set strokeColor(newValue) { this.view.strokeColor = newValue; }
    get strokeWidth() { return this.view.strokeWidth; }
    set strokeWidth(newValue) { this.view.strokeWidth = newValue; }
    setup() {
        // setup the svg
        super.setup();
        if (!this.view.svg || !this.view.path || !this.view) {
            return;
        }
        this.view.svg['mobject'] = this;
        this.view.setup();
        // screen events are detected on the path
        // so the active area is clipped to its shape
        // move to sensor setup?
        removePointerDown(this.view.div, this.sensor.capturedOnPointerDown.bind(this.sensor));
        removePointerMove(this.view.div, this.sensor.capturedOnPointerMove.bind(this.sensor));
        removePointerUp(this.view.div, this.sensor.capturedOnPointerUp.bind(this.sensor));
        addPointerDown(this.view.path, this.sensor.capturedOnPointerDown.bind(this.sensor));
        addPointerMove(this.view.path, this.sensor.capturedOnPointerMove.bind(this.sensor));
        addPointerUp(this.view.path, this.sensor.capturedOnPointerUp.bind(this.sensor));
    }
    static stringFromPoint(point) {
        // a string representation for CSS
        let x = point[0], y = point[1];
        return `${x} ${y}`;
    }
    pathString() {
        // This method turns this.vertices into a CSS path
        console.warn('please subclass pathString');
        return '';
    }
    relativeVertices(frame) {
        // the vertices are in local coordinates, convert them to the given frame of an ancestor mobject
        let returnValue = this.view.frame.relativeTransform(frame).appliedToVertices(this.vertices);
        if (returnValue == undefined) {
            return [];
        }
        else {
            return returnValue;
        }
    }
    globalVertices() {
        // uses default frame = paper
        return this.relativeVertices();
    }
    //////////////////////////////////////////////////////////
    //                                                      //
    //                     FRAME METHODS                    //
    //                                                      //
    //////////////////////////////////////////////////////////
    /*
    The coordinate extrema (x_min, x_max, y_min, y_max) are computed from the vertices
    instead of the view frame as for a general Mobject.
    Other coordinate quantities (x_mid, y_mid, ulCorner etc.) are computes from these
    four values.
    */
    localXMin() {
        let xMin = Infinity;
        if (this.vertices != undefined) {
            for (let p of this.vertices) {
                xMin = Math.min(xMin, p[0]);
            }
        }
        if (this.children != undefined) {
            for (let mob of this.children) {
                xMin = Math.min(xMin, mob.view.frame.localXMin() + mob.view.frame.anchor[0]);
            }
        }
        return xMin;
    }
    localXMax() {
        let xMax = -Infinity;
        if (this.vertices != undefined) {
            for (let p of this.vertices) {
                xMax = Math.max(xMax, p[0]);
            }
        }
        if (this.children != undefined) {
            for (let mob of this.children) {
                xMax = Math.max(xMax, mob.view.frame.localXMax() + mob.view.frame.anchor[0]);
            }
        }
        return xMax;
    }
    localYMin() {
        let yMin = Infinity;
        if (this.vertices != undefined) {
            for (let p of this.vertices) {
                yMin = Math.min(yMin, p[1]);
            }
        }
        if (this.children != undefined) {
            for (let mob of this.children) {
                yMin = Math.min(yMin, mob.view.frame.localYMin() + mob.view.frame.anchor[1]);
            }
        }
        return yMin;
    }
    localYMax() {
        let yMax = -Infinity;
        if (this instanceof MGroup) {
        }
        if (this.vertices != undefined) {
            for (let p of this.vertices) {
                yMax = Math.max(yMax, p[1]);
            }
        }
        if (this.children != undefined) {
            for (let mob of this.children) {
                yMax = Math.max(yMax, mob.view.frame.localYMax() + mob.view.frame.anchor[1]);
            }
        }
        return yMax;
    }
    localMidX() { return (this.localXMin() + this.localXMax()) / 2; }
    localMidY() { return (this.localYMin() + this.localYMax()) / 2; }
    localULCorner() { return [this.localXMin(), this.localYMin()]; }
    localURCorner() { return [this.localXMax(), this.localYMin()]; }
    localLLCorner() { return [this.localXMin(), this.localYMax()]; }
    localLRCorner() { return [this.localXMax(), this.localYMax()]; }
    localCenter() { return [this.localMidX(), this.localMidY()]; }
    localLeftCenter() { return [this.localXMin(), this.localMidY()]; }
    localRightCenter() { return [this.localXMax(), this.localMidY()]; }
    localTopCenter() { return [this.localMidX(), this.localYMin()]; }
    localBottomCenter() { return [this.localMidX(), this.localYMax()]; }
    ulCorner(frame) { return this.view.frame.transformLocalPoint(this.localULCorner(), frame); }
    urCorner(frame) { return this.view.frame.transformLocalPoint(this.localURCorner(), frame); }
    llCorner(frame) { return this.view.frame.transformLocalPoint(this.localLLCorner(), frame); }
    lrCorner(frame) { return this.view.frame.transformLocalPoint(this.localLRCorner(), frame); }
    center(frame) { return this.view.frame.transformLocalPoint(this.localCenter(), frame); }
    xMin(frame) { return this.ulCorner(frame)[0]; }
    xMax(frame) { return this.lrCorner(frame)[0]; }
    yMin(frame) { return this.ulCorner(frame)[1]; }
    yMax(frame) { return this.lrCorner(frame)[1]; }
    midX(frame) { return this.center(frame)[0]; }
    midY(frame) { return this.center(frame)[1]; }
    leftCenter(frame) { return this.view.frame.transformLocalPoint(this.localLeftCenter(), frame); }
    rightCenter(frame) { return this.view.frame.transformLocalPoint(this.localRightCenter(), frame); }
    topCenter(frame) { return this.view.frame.transformLocalPoint(this.localTopCenter(), frame); }
    bottomCenter(frame) { return this.view.frame.transformLocalPoint(this.localBottomCenter(), frame); }
    getWidth() { return this.localXMax() - this.localXMin(); }
    getHeight() { return this.localYMax() - this.localYMin(); }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VMobject.js.map