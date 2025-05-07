import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
import { SequencePlot } from './extensions/creations/DesmosCalculator/SequencePlot.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}

export const paper = new StartPaper();