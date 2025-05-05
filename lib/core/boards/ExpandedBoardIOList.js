import { IOList } from '../../core/linkables/IOList.js';
// import { vertex } from 'core/functions/vertex'
import { HOOK_INSET_X, HOOK_INSET_Y } from '../../core/linkables/constants.js';
import { OUTLET_HORIZONTAL_SPACING } from './constants.js';
import { Color } from '../../core/classes/Color.js';
export class ExpandedBoardIOList extends IOList {
    // 	defaults(): object {
    // 		return {
    // 			emptyLinkHook: new EditableLinkHook({ showBox: false })
    // 		}
    // 	}
    // 	mutabilities(): object {
    // 		return {
    // 			emptyLinkHook: 'always'
    // 		}
    // 	}
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    createOutlet(prop) {
        super.createOutlet(prop);
        this.linkOutlets[this.linkOutlets.length - 1].label.update({
            backgroundColor: Color.gray(0.5)
        });
    }
    positionOutlet(outlet, index) {
        outlet.update({
            anchor: [HOOK_INSET_X + OUTLET_HORIZONTAL_SPACING * index, HOOK_INSET_Y]
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ExpandedBoardIOList.js.map