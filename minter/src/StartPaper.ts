
import { log } from './core/functions/logging'
//import { AllTests } from './_tests/allTests'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper'
import { Coin } from './extensions/creations/CoinFlipper/Coin'
import { Transform } from './core/classes/Transform'
import { MathExpressionField } from './extensions/creations/MathExpressionField/MathExpressionField'

export class StartPaper extends CoinFlipPaper { }

//AllTests.run()

export const paper = new StartPaper()
