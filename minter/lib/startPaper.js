import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
//import { AllTests } from './_tests/allTests.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export const TESTING = true;
if (TESTING) {
//    AllTests.run();
}
export const paper = new StartPaper();
//# sourceMappingURL=startPaper.js.map