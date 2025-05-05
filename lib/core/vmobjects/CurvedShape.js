import { CurvedLine } from './CurvedLine.js';
export class CurvedShape extends CurvedLine {
    /*
    A closed CurvedLine is a CurvedShape
    */
    mutabilities() {
        return {
            closed: 'never'
        };
    }
    defaults() { return {}; }
}
//# sourceMappingURL=CurvedShape.js.map