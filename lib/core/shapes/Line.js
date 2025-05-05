import { vertexOrigin } from '../../core/functions/vertex.js';
import { Polygon } from '../../core/vmobjects/Polygon.js';
export class Line extends Polygon {
    defaults() {
        return {
            startPoint: vertexOrigin(),
            endPoint: vertexOrigin()
        };
    }
    /*
    Subclasses might want to draw not right from start to end,
    but e. g. extend to the edge of the screen or leave
    space for an arrow
    */
    drawingStartPoint() {
        return this.startPoint;
    }
    drawingEndPoint() {
        return this.endPoint;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        let p = this.drawingStartPoint();
        let q = this.drawingEndPoint();
        this.vertices = [p, q];
        if (redraw) {
            this.view.redraw();
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Line.js.map