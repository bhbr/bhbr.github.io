import { Paper } from '../../../core/Paper.js';
import { WavyCreator } from '../../../extensions/creations/Wavy/WavyCreator.js';
import { SliderCreator } from '../../../extensions/creations/math/Slider/SliderCreator.js';
import { StepperCreator } from '../../../extensions/creations/math/Stepper/StepperCreator.js';
import { NumberBoxCreator } from '../../../extensions/creations/math/boxes/NumberBox.js';
import { AddBoxCreator, SubtractBoxCreator, MultiplyBoxCreator, DivideBoxCreator } from '../../../extensions/creations/math/boxes/BinaryOperatorBoxCreator.js';
import { ConstructionCreator } from '../../../extensions/boards/construction/ConstructionCreator.js';
import { SwingCreator } from '../../../extensions/creations/Swing/SwingCreator.js';
import { RGBAColorSampleCreator } from '../../../extensions/creations/ColorSample/RGBAColorSampleCreator.js';
import { WheelColorSampleCreator } from '../../../extensions/creations/ColorSample/WheelColorSampleCreator.js';
import { ConLineConstructor } from '../../../extensions/boards/construction/straits/ConLine/ConLineConstructor.js';
import { ConRayConstructor } from '../../../extensions/boards/construction/straits/ConRay/ConRayConstructor.js';
import { ConSegmentConstructor } from '../../../extensions/boards/construction/straits/ConSegment/ConSegmentConstructor.js';
import { ConCircleConstructor } from '../../../extensions/boards/construction/ConCircle/ConCircleConstructor.js';
import { CindyLoader } from '../../../extensions/apis/CindyLoader.js';
import { DesmosLoader } from '../../../extensions/apis/DesmosLoader.js';
import { MathQuillLoader } from '../../../extensions/apis/MathQuillLoader.js';
import { PolypadLoader } from '../../../extensions/apis/PolypadLoader.js';
import { PolypadCreator } from '../../../extensions/creations/Polypad/PolypadCreator.js';
import { MathExpressionFieldCreator } from '../../../extensions/creations/MathExpressionField/MathExpressionFieldCreator.js';
import { EquationCreator } from '../../../extensions/creations/VisualAlgebra/view/EquationCreator.js';
import { PlayableCoinCreator } from '../../../extensions/creations/CoinFlipper/PlayableCoinCreator.js';
import { CoinRowCreator } from '../../../extensions/creations/CoinFlipper/CoinRowCreator.js';
import { CoinStackCreator } from '../../../extensions/creations/CoinFlipper/CoinStackCreator.js';
export class DemoPaper extends Paper {
    defaults() {
        return {
            creationConstructors: {
                'wavy': WavyCreator,
                'slider': SliderCreator,
                'stepper': StepperCreator,
                'number': NumberBoxCreator,
                'add': AddBoxCreator,
                'subtract': SubtractBoxCreator,
                'multiply': MultiplyBoxCreator,
                'divide': DivideBoxCreator,
                'swing': SwingCreator,
                'color-rgba': RGBAColorSampleCreator,
                'color-wheel': WheelColorSampleCreator,
                'polypad': PolypadCreator,
                'construction': ConstructionCreator,
                'line': ConLineConstructor,
                'ray': ConRayConstructor,
                'segment': ConSegmentConstructor,
                'circle': ConCircleConstructor,
                'expression': MathExpressionFieldCreator,
                'equation': EquationCreator,
                'coin': PlayableCoinCreator,
                'coin row': CoinRowCreator,
                'coin stack': CoinStackCreator
            },
            buttonNames: [
                'DragButton',
                'LinkButton',
                'ControlsButton',
                'NumberButton',
                'ArithmeticButton',
                'AlgebraButton',
                //				'ConButton',
                'CoinButton',
                'PolypadButton',
                'WavyButton',
                'SwingButton',
                'ColorSampleButton'
            ],
            apiLoaders: [
                new CindyLoader(),
                new DesmosLoader(),
                new MathQuillLoader(),
                new PolypadLoader()
            ]
        };
    }
    mutabilities() {
        return {
            creationConstructors: 'never',
            buttonNames: 'never'
        };
    }
    loadContent() {
    }
}
let d = new DemoPaper();
//# sourceMappingURL=DemoPaper.js.map