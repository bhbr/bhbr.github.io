import { Circle } from '../../core/shapes/Circle.js';
import { Color } from '../../core/classes/Color.js';
import { HOOK_RADIUS } from './constants.js';
export class LinkHook extends Circle {
    defaults() {
        return {
            name: '',
            kind: 'input',
            radius: HOOK_RADIUS,
            fillOpacity: 0,
            strokeColor: Color.white(),
            mobject: null,
            outlet: null
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
}
//# sourceMappingURL=LinkHook.js.map