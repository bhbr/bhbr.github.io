import { BoxSliderCreator } from '../../../../extensions/creations/math/BoxSlider/BoxSliderCreator.js';
import { BoxStepper } from './BoxStepper.js';
export class BoxStepperCreator extends BoxSliderCreator {
    defaults() {
        return {
            helpText: 'A vertical number stepper (slider for integers). Drag to the desired size. The min and max values can be edited.'
        };
    }
    createMobject() {
        return this.creation || new BoxStepper({ height: 0 });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BoxStepperCreator.js.map