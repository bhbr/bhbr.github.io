import { IOList } from './IOList.js';
import { IO_LIST_OFFSET } from './constants.js';
export class OutputList extends IOList {
    defaults() {
        return {
            kind: 'output'
        };
    }
    getAnchor() {
        return [
            0.5 * (this.mobject.getCompactWidth() - this.view.frame.width),
            this.mobject.getCompactHeight() + IO_LIST_OFFSET + 15
        ];
        // TODO: replace the hacky 15px
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=OutputList.js.map