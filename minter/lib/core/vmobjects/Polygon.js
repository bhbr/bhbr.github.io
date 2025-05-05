import { PolygonalLine } from './PolygonalLine.js';
export class Polygon extends PolygonalLine {
    /*
    A Polygon is a closed PolygonalLine
    */
    mutabilities() {
        return {
            closed: 'never'
        };
    }
    defaults() { return {}; }
}
//# sourceMappingURL=Polygon.js.map