import { Creator } from '../../../core/creators/Creator.js';
import { CoinRow } from './CoinRow.js';
export class CoinRowCreator extends Creator {
    setup() {
        super.setup();
        this.creation = this.createMobject();
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
        this.parent.addToContent(this.creation);
        this.parent.creator = null;
        this.parent.remove(this);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinRowCreator.js.map