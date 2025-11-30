import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { CoinStack } from './CoinStack.js';
export class CoinStackCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A stack of coins automatically sorted into heads (H) and tails (T). Tap the stack or the play button to flip all the coins. The number of coins can be edited.',
            pointOffset: [-50, -250]
        };
    }
    createMobject() {
        return new CoinStack();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinStackCreator.js.map