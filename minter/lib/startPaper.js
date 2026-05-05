//import { AllTests } from './_tests/allTests'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
import { NumberListBox } from './extensions/creations/math/boxes/NumberListBox.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//AllTests.run()
export const paper = new StartPaper();
let box = new NumberListBox({
    value: [0, 1, 0],
    anchor: [100, 100]
});
paper.addToContent(box);
//# sourceMappingURL=startPaper.js.map