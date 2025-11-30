import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
import { PlayableCoin } from './PlayableCoin.js';
export class PlayableCoinCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'A coin that shows either heads (H) or tails (T). Tap the coin or the play button to flip it.',
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