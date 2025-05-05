import { CircularArc } from './CircularArc.js';
import { TAU } from '../../core/constants.js';
export class Circle extends CircularArc {
    /*
    A Circle is a CircularArc whose angle equals TAU = 2*PI.
    */
    defaults() {
        return {
            angle: TAU,
            closed: true
        };
    }
    mutabilities() {
        return {
            angle: 'never',
            closed: 'never'
        };
    }
}
//# sourceMappingURL=Circle.js.map