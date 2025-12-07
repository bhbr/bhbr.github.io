
import { DemoPaper } from './extensions/boards/demo/DemoPaper'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper'
import { log } from './core/functions/logging'
import { MathQuillFormula } from './extensions/creations/MathQuillFormula/MathQuillFormula'

export class StartPaper extends CoinFlipPaper { }

export const paper = new StartPaper()
