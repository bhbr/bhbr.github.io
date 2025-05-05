import { Paper } from '../../../core/Paper.js';
import { WavyCreator } from '../../../extensions/creations/Wavy/WavyCreator.js';
import { DesmosCalculatorCreator } from '../../../extensions/creations/DesmosCalculator/DesmosCalculatorCreator.js';
import { BoxSliderCreator } from '../../../extensions/creations/math/BoxSlider/BoxSliderCreator.js';
import { BoxStepperCreator } from '../../../extensions/creations/math/BoxStepper/BoxStepperCreator.js';
import { NumberBoxCreator } from '../../../core/boxes/NumberBox.js';
import { InputNumberBoxCreator } from '../../../extensions/creations/math/InputNumberBox/InputNumberBoxCreator.js';
import { AddBoxCreator, SubtractBoxCreator, MultiplyBoxCreator, DivideBoxCreator } from '../../../core/boxes/BinaryOperatorBoxCreator.js';
import { BoardCreator } from '../../../core/boards/BoardCreator.js';
import { ConstructionCreator } from '../../../extensions/boards/construction/ConstructionCreator.js';
import { SwingCreator } from '../../../extensions/creations/Swing/SwingCreator.js';
import { RGBAColorSampleCreator } from '../../../extensions/creations/ColorSample/RGBAColorSampleCreator.js';
import { ConLineConstructor } from '../../../extensions/boards/construction/straits/ConLine/ConLineConstructor.js';
import { ConRayConstructor } from '../../../extensions/boards/construction/straits/ConRay/ConRayConstructor.js';
import { ConSegmentConstructor } from '../../../extensions/boards/construction/straits/ConSegment/ConSegmentConstructor.js';
import { ConCircleConstructor } from '../../../extensions/boards/construction/ConCircle/ConCircleConstructor.js';
export class DemoPaper extends Paper {
    defaults() {
        return {
            creationConstructors: {
                'wavy': WavyCreator,
                'desmos': DesmosCalculatorCreator,
                'slider': BoxSliderCreator,
                'stepper': BoxStepperCreator,
                'num': NumberBoxCreator,
                'input': InputNumberBoxCreator,
                '+': AddBoxCreator,
                '–': SubtractBoxCreator,
                '&times;': MultiplyBoxCreator,
                '/': DivideBoxCreator,
                'board': BoardCreator,
                'swing': SwingCreator,
                'color': RGBAColorSampleCreator,
                'geo': ConstructionCreator,
                'line': ConLineConstructor,
                'ray': ConRayConstructor,
                'segment': ConSegmentConstructor,
                'circle': ConCircleConstructor
            },
            buttonNames: [
                'DragButton',
                'LinkButton',
                'ExtendedBoardButton',
                'NumberButton',
                'ArithmeticButton',
                'WavyButton',
                'SwingButton',
                'ColorSampleButton'
            ]
        };
    }
    mutabilities() {
        return {
            creationConstructors: 'never',
            buttonNames: 'never'
        };
    }
}
//# sourceMappingURL=DemoPaper.js.map