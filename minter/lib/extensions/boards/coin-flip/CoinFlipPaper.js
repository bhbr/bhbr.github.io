import { Paper } from '../../../core/Paper.js';
import { PlayableCoinCreator } from '../../../extensions/creations/CoinFlipper/PlayableCoinCreator.js';
import { CoinRowCreator } from '../../../extensions/creations/CoinFlipper/CoinRowCreator.js';
import { CoinStackCreator } from '../../../extensions/creations/CoinFlipper/CoinStackCreator.js';
import { NumberBoxCreator } from '../../../extensions/creations/math/boxes/NumberBox.js';
import { NumberListBoxCreator } from '../../../extensions/creations/math/boxes/NumberListBox.js';
import { BoxSliderCreator } from '../../../extensions/creations/math/BoxSlider/BoxSliderCreator.js';
import { BoxStepperCreator } from '../../../extensions/creations/math/BoxStepper/BoxStepperCreator.js';
import { AddBoxCreator, SubtractBoxCreator, MultiplyBoxCreator, DivideBoxCreator } from '../../../extensions/creations/math/box_functions/BinaryOperatorBoxCreator.js';
import { LessThanBoxCreator, LessThanOrEqualBoxCreator, GreaterThanBoxCreator, GreaterThanOrEqualBoxCreator, EqualsBoxCreator, NotEqualsBoxCreator } from '../../../extensions/creations/math/box_functions/ComparisonBoxCreator.js';
import { SumBoxCreator } from '../../../extensions/creations/math/box_functions/SumBox.js';
import { AverageBoxCreator } from '../../../extensions/creations/math/box_functions/AverageBox.js';
import { ScatterPlotCreator } from '../../../extensions/creations/DesmosCalculator/ScatterPlotCreator.js';
import { HistogramCreator } from '../../../extensions/creations/DesmosCalculator/HistogramCreator.js';
import { RGBAColorSampleCreator } from '../../../extensions/creations/ColorSample/RGBAColorSampleCreator.js';
import { WheelColorSampleCreator } from '../../../extensions/creations/ColorSample/WheelColorSampleCreator.js';
import { MathQuillFormulaCreator } from '../../../extensions/creations/MathQuillFormula/MathQuillFormulaCreator.js';
export class CoinFlipPaper extends Paper {
    defaults() {
        return {
            creationConstructors: {
                'number': NumberBoxCreator,
                'list': NumberListBoxCreator,
                'slider': BoxSliderCreator,
                'stepper': BoxStepperCreator,
                'coin': PlayableCoinCreator,
                'coin row': CoinRowCreator,
                'coin stack': CoinStackCreator,
                'add': AddBoxCreator,
                'subtract': SubtractBoxCreator,
                'multiply': MultiplyBoxCreator,
                'divide': DivideBoxCreator,
                'less than': LessThanBoxCreator,
                'less or equal': LessThanOrEqualBoxCreator,
                'greater than': GreaterThanBoxCreator,
                'greater or equal': GreaterThanOrEqualBoxCreator,
                'equal': EqualsBoxCreator,
                'not equal': NotEqualsBoxCreator,
                'expression': MathQuillFormulaCreator,
                'sum': SumBoxCreator,
                'mean': AverageBoxCreator,
                'plot': ScatterPlotCreator,
                'histogram': HistogramCreator,
                'rgb color': RGBAColorSampleCreator,
                'color wheel': WheelColorSampleCreator,
            },
            buttonNames: [
                'DragButton',
                'LinkButton',
                'ControlsButton',
                'CoinButton',
                'NumberButton',
                'ArithmeticButton',
                'ComparisonButton',
                'AlgebraButton',
                'ListFunctionsButton',
                'PlotButton',
                'ColorSampleButton',
                'EraseButton'
            ]
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinFlipPaper.js.map