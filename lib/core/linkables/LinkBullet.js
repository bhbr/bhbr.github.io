import { Circle } from '../../core/shapes/Circle.js';
import { BULLET_RADIUS } from './constants.js';
import { Color } from '../../core/classes/Color.js';
export class LinkBullet extends Circle {
    /*
    A link bullet gets dragged onto a link hook to create
    a dependency between two linkable mobjects.
    */
    defaults() {
        return {
            radius: BULLET_RADIUS,
            fillOpacity: 1,
            strokeColor: Color.white()
        };
    }
    mutabilities() {
        return {
            radius: 'never',
            fillOpacity: 'never',
            strokeColor: 'never'
        };
    }
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    positionInBoard() {
        // used e. g. for snapping
        return this.midpoint;
    }
}
//# sourceMappingURL=LinkBullet.js.map