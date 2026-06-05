import { Line } from '../../../../core/shapes/Line.js';
export class ConStrait extends Line {
    drawingStartPoint() { return this.startPoint; }
    drawingEndPoint() { return this.endPoint; }
    update(args = {}, redraw = true) {
        super.update(args, false);
        this.vertices[0] = this.drawingStartPoint();
        this.vertices[1] = this.drawingEndPoint();
        if (redraw) {
            this.view.redraw();
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConStrait.js.map