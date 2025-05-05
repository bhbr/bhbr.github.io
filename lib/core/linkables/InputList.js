import { IOList } from './IOList.js';
import { IO_LIST_OFFSET } from './constants.js';
export class InputList extends IOList {
    defaults() {
        return {
            kind: 'input'
        };
    }
    getAnchor() {
        return [0.5 * (this.mobject.getCompactWidth() - this.view.frame.width), -IO_LIST_OFFSET - this.getHeight()];
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=InputList.js.map