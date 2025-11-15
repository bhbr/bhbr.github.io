import { Circle } from '../../core/shapes/Circle.js';
import { Color } from '../../core/classes/Color.js';
import { HOOK_RADIUS, BULLET_RADIUS } from './constants.js';
export class LinkHook extends Circle {
    defaults() {
        return {
            name: '',
            kind: 'input',
            radius: HOOK_RADIUS,
            fillOpacity: 0,
            strokeColor: Color.white(),
            mobject: null,
            outlet: null,
            linked: false,
            linkedBulletIndicator: new Circle({
                radius: BULLET_RADIUS,
                fillColor: Color.white(),
                fillOpacity: 1,
                midpoint: [HOOK_RADIUS, HOOK_RADIUS]
            })
        };
    }
    mutabilities() {
        return {
            radius: 'never',
            fillOpacity: 'never',
            strokeColor: 'never',
            name: 'always',
            kind: 'on_init',
            outlet: 'on_init'
        };
    }
    setup() {
        super.setup();
        if (this.linked) {
            this.add(this.linkedBulletIndicator);
        }
    }
    positionInBoard() {
        let board = this.outlet.ioList.mobject.board;
        return this.parent.frame.transformLocalPoint(this.midpoint, board.frame);
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['linked'] !== undefined) {
            if (this.linked) {
                this.add(this.linkedBulletIndicator);
            }
            else {
                this.remove(this.linkedBulletIndicator);
            }
        }
    }
}
//# sourceMappingURL=LinkHook.js.map