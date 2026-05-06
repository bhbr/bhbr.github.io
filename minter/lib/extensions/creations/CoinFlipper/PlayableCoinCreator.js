import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { PlayableCoin } from './PlayableCoin.js';
export class PlayableCoinCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A coin that shows either heads (H) or tails (T). Tap the coin or the play button to flip it. Long press to flip 100 times. Swipe the coin left or right to fix the outcome, e. g. for creating an artificial streak.',
            pointOffset: [-25, -50]
        };
    }
    createMobject() {
        let c = new PlayableCoin();
        c.update({
            anchor: this.pointOffset
        });
        return c;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoinCreator.js.map