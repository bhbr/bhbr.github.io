import { vertexOrigin } from '../../core/functions/vertex.js';
import { Polygon } from '../../core/vmobjects/Polygon.js';
export class Rectangle extends Polygon {
    defaults() {
        return {
            width: 200,
            height: 100,
            p1: vertexOrigin(),
            p2: [200, 0],
            p3: [200, 100],
            p4: [0, 100]
        };
    }
    setup() {
        super.setup();
        this.update({
            vertices: [this.p1, this.p2, this.p3, this.p4]
        });
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        //// internal dependencies
        this.view.frame.width = this.width;
        this.view.frame.height = this.height;
        this.p2[0] = this.width;
        this.p3[0] = this.width;
        this.p3[1] = this.height;
        this.p4[1] = this.height;
        if (redraw) {
            this.view.redraw();
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Rectangle.js.map