import { SliderCreator } from '../../../../extensions/creations/math/Slider/SliderCreator.js';
import { Stepper } from './Stepper.js';
export class StepperCreator extends SliderCreator {
    defaults() {
        return {
            helpText: 'A vertical number stepper (slider for integers). Drag to the desired size. The min and max values can be edited.'
        };
    }
    createMobject() {
        return this.creation || new Stepper({ height: 0 });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=StepperCreator.js.map