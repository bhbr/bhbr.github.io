import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { PlayableCoin } from './PlayableCoin.js';
export class PlayableCoinCreator extends DraggingCreator {
    createMobject() {
        return new PlayableCoin();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoinCreator.js.map