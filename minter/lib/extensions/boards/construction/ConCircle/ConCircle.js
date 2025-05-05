import { Circle } from '../../../../core/shapes/Circle.js';
import { vertexOrigin, vertexSubtract, vertexNorm } from '../../../../core/functions/vertex.js';
import { Color } from '../../../../core/classes/Color.js';
export class ConCircle extends Circle {
    defaults() {
        return {
            strokeColor: Color.white(),
            fillColor: Color.white(),
            fillOpacity: 0,
            outerPoint: vertexOrigin()
        };
    }
    setup() {
        super.setup();
        this.view.div.style['pointer-events'] = 'none';
    }
    update(args = {}, redraw = true) {
        let p = args['midpoint'] || this.midpoint;
        let q = args['outerPoint'] || this.outerPoint;
        let r = vertexNorm(vertexSubtract(p, q));
        args['radius'] = r;
        super.update(args, redraw);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ConCircle.js.map