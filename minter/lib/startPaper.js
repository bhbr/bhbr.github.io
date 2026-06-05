import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
import { Partition } from './extensions/animation_sequences/PascalsBrickWall/Partition.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export const TESTING = true;
//if (TESTING) { AllTests.run() }
export const paper = new StartPaper();
// let wall = new PascalsBrickWall({
// 	anchor: [300, 700],
// 	nbFlips: 1
// })
// paper.addToContent(wall)
let p = new Partition({
    presentationForm: 'histogram',
    tailsProbability: 0.5,
    anchor: [300, 400],
    nbFlips: 1
});
paper.addToContent(p);
// let b = new Brick({
// 	anchor: [100, 100],
// 	nbFlips: 1,
// 	nbTails: 0,
// 	height: BASE_BRICK_HEIGHT
// })
// paper.add(b)
// let l = new DetailedBrickLabel({
// 	anchor: [100, 100],
// 	nbHeads: 0,
// 	nbTails: 0
// })
// paper.add(l)
// l.update({
// 	nbHeads: 1
// })
// l.addTailsCoins(2)
// l.removeHeadsCoin()
//# sourceMappingURL=startPaper.js.map