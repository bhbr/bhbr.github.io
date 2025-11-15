import { IOList } from './IOList.js';
import { IO_LIST_OFFSET, IO_LIST_WIDTH } from './constants.js';
export class InputList extends IOList {
    defaults() {
        return {
            kind: 'input'
        };
    }
    getAnchor() {
        return [0.5 * (this.mobject.getCompactWidth() - IO_LIST_WIDTH), -IO_LIST_OFFSET - this.getHeight()];
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=InputList.js.map