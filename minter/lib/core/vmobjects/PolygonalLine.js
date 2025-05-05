import { VMobject } from './VMobject.js';
import { vertexIsNaN } from '../../core/functions/vertex.js';
export class PolygonalLine extends VMobject {
    defaults() {
        return {
            closed: true,
            fillOpacity: 0
        };
    }
    mutabilities() {
        return {
            closed: 'on_init'
        };
    }
    static makePathString(vertices, closed) {
        let pathString = '';
        let v = vertices;
        if (v.length == 0) {
            return '';
        }
        for (let point of v) {
            if (point == undefined || vertexIsNaN(point)) {
                pathString = '';
                return pathString;
            }
            // move (M) to the first point, then connect the points with lines (L)
            let prefix = (pathString == '') ? 'M' : 'L';
            pathString += prefix + VMobject.stringFromPoint(point);
        }
        if (closed) {
            pathString += 'Z';
        }
        return pathString;
    }
    pathString() {
        return PolygonalLine.makePathString(this.vertices, this.closed);
    }
}
//# sourceMappingURL=PolygonalLine.js.map