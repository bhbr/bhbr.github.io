import { Creator } from '../../../core/creators/Creator.js';
import { CoinRow } from './CoinRow.js';
import { vertexSubtract } from '../../../core/functions/vertex.js';
export class CoinRowCreator extends Creator {
    defaults() {
        return {
            helpText: 'A row of coins. Drag horizontally to the desired number of coins. Tap the coins or the play button to flip them.'
        };
    }
    setup() {
        super.setup();
        this.creation = this.createMobject();
        this.creation.update({
            anchor: vertexSubtract(this.getEndPoint(), this.getStartPoint())
        });
        this.add(this.creation);
    }
    createMobject() {
        return new CoinRow({
            nbCoins: 1,
            anchor: this.getStartPoint()
        });
    }
    updateFromTip(q, redraw = true) {
        let width = q[0] - this.getStartPoint()[0] - 100;
        let nbCoins = Math.max(Math.floor(width / this.creation.coinSpacing), 1);
        this.creation.update({
            nbCoins: nbCoins
        });
    }
    dissolve() {
        if (this.creation === null) {
            return;
        }
        this.creation.update({
            anchor: this.getStartPoint(),
            frameWidth: this.creation.computeWidth()
        });
        this.creation.inputList.positionSelf();
        this.creation.outputList.positionSelf();
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinRowCreator.js.map