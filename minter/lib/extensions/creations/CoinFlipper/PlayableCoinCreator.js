import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { PlayableCoin } from './PlayableCoin.js';
export class PlayableCoinCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A coin that shows either heads (H) or tails (T). Tap the coin or the play button to flip it.'
        };
    }
    createMobject() {
        return new PlayableCoin();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoinCreator.js.map