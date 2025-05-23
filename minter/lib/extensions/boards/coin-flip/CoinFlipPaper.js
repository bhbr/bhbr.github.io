import { Paper } from '../../../core/Paper.js';
import { PlayableCoinCreator } from '../../../extensions/creations/CoinFlipper/PlayableCoinCreator.js';
import { CoinRowCreator } from '../../../extensions/creations/CoinFlipper/CoinRowCreator.js';
import { NumberBoxCreator } from '../../../core/boxes/NumberBox.js';
import { NumberListBoxCreator } from '../../../core/boxes/NumberListBox.js';
import { InputNumberBoxCreator } from '../../../extensions/creations/math/InputNumberBox/InputNumberBoxCreator.js';
import { BoxSliderCreator } from '../../../extensions/creations/math/BoxSlider/BoxSliderCreator.js';
import { BoxStepperCreator } from '../../../extensions/creations/math/BoxStepper/BoxStepperCreator.js';
import { AddBoxCreator, SubtractBoxCreator, MultiplyBoxCreator, DivideBoxCreator } from '../../../core/boxes/BinaryOperatorBoxCreator.js';
import { SumBoxCreator } from '../../../core/boxes/SumBox.js';
import { AverageBoxCreator } from '../../../core/boxes/AverageBox.js';
import { SequencePlotCreator } from '../../../extensions/creations/DesmosCalculator/SequencePlotCreator.js';
import { HistogramCreator } from '../../../extensions/creations/DesmosCalculator/HistogramCreator.js';
import { RGBAColorSampleCreator } from '../../../extensions/creations/ColorSample/RGBAColorSampleCreator.js';
import { WheelColorSampleCreator } from '../../../extensions/creations/ColorSample/WheelColorSampleCreator.js';
export class CoinFlipPaper extends Paper {
    defaults() {
        return {
            creationConstructors: {
                'number': NumberBoxCreator,
                'list': NumberListBoxCreator,
                'input': InputNumberBoxCreator,
                'slider': BoxSliderCreator,
                'stepper': BoxStepperCreator,
                'coin': PlayableCoinCreator,
                'coinrow': CoinRowCreator,
                '+': AddBoxCreator,
                '–': SubtractBoxCreator,
                '&times;': MultiplyBoxCreator,
                '/': DivideBoxCreator,
                'sum': SumBoxCreator,
                'mean': AverageBoxCreator,
                'plot': SequencePlotCreator,
                'hist': HistogramCreator,
                'rgb': RGBAColorSampleCreator,
                'wheel': WheelColorSampleCreator,
            },
            buttonNames: [
                'DragButton',
                'LinkButton',
                'ControlsButton',
                'CoinButton',
                'NumberButton',
                'ArithmeticButton',
                'ListFunctionsButton',
                'PlotButton',
                'ColorSampleButton',
                'RestartButton'
            ]
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinFlipPaper.js.map