//import { AllTests } from './_tests/allTests'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
import { isTouchDevice, separateSidebar } from './core/mobjects/screen_events.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//AllTests.run()
export const paper = new StartPaper();
if (isTouchDevice && separateSidebar) {
    paper.background.view.div.style.backgroundColor = 'rgba(0, 0, 0, 1)';
}
//# sourceMappingURL=startPaper.js.map