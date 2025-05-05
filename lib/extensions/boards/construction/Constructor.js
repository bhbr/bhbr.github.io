import { Creator } from '../../../core/creators/Creator.js';
import { Color } from '../../../core/classes/Color.js';
export class Constructor extends Creator {
    defaults() {
        return {
            construction: undefined, // defined in constructor arguments
            penStrokeColor: Color.white(),
            penStrokeWidth: 1.0,
            penFillColor: Color.white(),
            penFillOpacity: 0.0
        };
    }
    mutabilities() {
        return {
            construction: 'on_init'
        };
    }
    dissolve() {
        this.construction.integrate(this);
        this.construction.creator = null;
        this.construction.remove(this);
    }
}
//# sourceMappingURL=Constructor.js.map