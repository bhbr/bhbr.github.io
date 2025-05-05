import { BoxSliderCreator } from '../../../../extensions/creations/math/BoxSlider/BoxSliderCreator.js';
import { BoxStepper } from './BoxStepper.js';
export class BoxStepperCreator extends BoxSliderCreator {
    createMobject() {
        return this.creation || new BoxStepper();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BoxStepperCreator.js.map