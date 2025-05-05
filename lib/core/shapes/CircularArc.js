import { CurvedLine } from '../../core/vmobjects/CurvedLine.js';
import { vertexTranslatedBy, vertexCentrallyScaledBy } from '../../core/functions/vertex.js';
import { TAU } from '../../core/constants.js';
const DEFAULT_RADIUS = 10;
export class CircularArc extends CurvedLine {
    defaults() {
        return {
            closed: false,
            anchor: undefined,
            midpoint: [DEFAULT_RADIUS, DEFAULT_RADIUS],
            radius: DEFAULT_RADIUS,
            angle: TAU / 4,
            nbPoints: 32
        };
    }
    // A circle's midpoint is not implemented as its own property,
    // that needs to be kept in sync with its anchor
    get midpoint() {
        if (this.radius === undefined) {
            throw 'No radius yet!';
        }
        return vertexTranslatedBy(this.view.frame.anchor, [this.radius, this.radius]);
    }
    set midpoint(newValue) {
        if (this.radius === undefined) {
            throw 'No radius yet!';
        }
        this.view.frame.anchor = vertexTranslatedBy(newValue, [-this.radius, -this.radius]);
    }
    synchronizeUpdateArguments(args = {}) {
        /*
        Since midpoint is just an alias for a shifted anchor, there is possible
        confusion when updating a Circle/CircularArc with a new midpoint, anchor
        and/or radius.
        This is resolved here:
            - updating the midpoint changes the anchor using the given new or existing radius
            - updating just the radius keeps the midpoint where it is (the anchor changes instead)
        */
        // read all possible new values
        let r = args['radius'];
        let m = args['midpoint'];
        let a = args['anchor'];
        if (m && a) {
            throw `Inconsistent data: cannot set midpoint and anchor of a ${this.constructor.name} simultaneously`;
        }
        // adjust the anchor according to the given parameters
        if (r !== undefined && !m && !a) { // only r given
            args['anchor'] = vertexTranslatedBy(this.midpoint, [-r, -r]);
        }
        else if (r === undefined && m && !a) { // only m given
            args['anchor'] = vertexTranslatedBy(m, [-this.radius, -this.radius]);
        }
        else if (r === undefined && !m && a) { // only a given
            // nothing to adjust
        }
        else if (r !== undefined && m) { // r and m given, but no a
            args['anchor'] = vertexTranslatedBy(m, [-r, -r]);
        }
        else if (r !== undefined && !m && a) { // r and a given
            // nothing to adjust
        }
        // remove the new midpoint (taken care of by updating the anchor)
        delete args['midpoint'];
        let updatedRadius = (r !== undefined) ? r : this.radius;
        args['frameWidth'] = 2 * updatedRadius;
        args['frameHeight'] = 2 * updatedRadius;
        return args;
    }
    updateBezierPoints() {
        let newBezierPoints = [];
        let d = this.radius * 4 / 3 * Math.tan(this.angle / (4 * this.nbPoints));
        for (let i = 0; i <= this.nbPoints; i++) {
            let theta = i / this.nbPoints * this.angle;
            let radialUnitVector = [Math.cos(theta), Math.sin(theta)];
            let tangentUnitVector = [-Math.sin(theta), Math.cos(theta)];
            let anchorPoint = vertexCentrallyScaledBy(radialUnitVector, this.radius);
            let leftControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, -d));
            let rightControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, d));
            if (i != 0) {
                newBezierPoints.push(leftControlPoint);
            }
            newBezierPoints.push(anchorPoint);
            if (i != this.nbPoints) {
                newBezierPoints.push(rightControlPoint);
            }
        }
        let translatedBezierPoints = [];
        for (let i = 0; i < newBezierPoints.length; i++) {
            translatedBezierPoints.push(vertexTranslatedBy(newBezierPoints[i], [this.radius, this.radius]));
        }
        this.bezierPoints = translatedBezierPoints;
        // do NOT update the view, because redraw calls updateBezierPoints
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CircularArc.js.map