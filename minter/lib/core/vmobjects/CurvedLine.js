import { VMobject } from './VMobject.js';
export class CurvedLine extends VMobject {
    /*
    In a curved line, the array this.bezierPoints represents the vertices and control points:
    - this.bezierPoints[0, 3, 6, 9, ...] : vertices (synced with this.vertices)
    - this.bezierPoints[1, 4, 7, 10, ...] : forward ('left') control points
    - this.bezierPoints[2, 5, 8, 11, ...] : backward ('right') control points
    The array is wrapped in an accessor that keeps this.vertices in sync with it
    */
    defaults() {
        return {
            closed: true
        };
    }
    mutabilities() {
        return {
            closed: 'on_init'
        };
    }
    get bezierPoints() { return this._bezierPoints; }
    set bezierPoints(newValue) {
        this._bezierPoints = newValue;
        let v = [];
        let i = 0;
        for (let p of this.bezierPoints) {
            if (i % 3 == 1) {
                v.push(p);
            }
            i += 1;
        }
        this.vertices = v;
    }
    updateBezierPoints() { }
    // implemented by subclasses
    update(args = {}, redraw = true) {
        super.update(args, false);
        this.updateBezierPoints();
        if (redraw) {
            this.view.redraw();
        }
    }
    static makePathString(bezierPoints, closed = false) {
        let points = bezierPoints;
        if (points == undefined || points.length == 0) {
            return '';
        }
        // there should be 3n + 1 points
        let nbCurves = (points.length - 1) / 3;
        if (nbCurves % 1 != 0) {
            throw 'Incorrect number of Bézier points';
        }
        // move to the first point
        let pathString = 'M' + VMobject.stringFromPoint(points[0]);
        // next piece of Bézier curve defined by three points
        for (let i = 0; i < nbCurves; i++) {
            let point1str = VMobject.stringFromPoint(points[3 * i + 1]);
            let point2str = VMobject.stringFromPoint(points[3 * i + 2]);
            let point3str = VMobject.stringFromPoint(points[3 * i + 3]);
            pathString += `C${point1str} ${point2str} ${point3str}`;
        }
        if (closed) {
            pathString += 'Z';
        }
        return pathString;
    }
    pathString() {
        return CurvedLine.makePathString(this.bezierPoints, this.closed);
    }
}
//# sourceMappingURL=CurvedLine.js.map