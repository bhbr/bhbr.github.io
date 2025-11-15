import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { CoinStack } from './CoinStack.js';
export class CoinStackCreator extends DraggingCreator {
    createMobject() {
        return new CoinStack();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinStackCreator.js.map