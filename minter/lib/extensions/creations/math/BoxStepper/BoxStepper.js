import { BoxSlider } from '../../../../extensions/creations/math/BoxSlider/BoxSlider.js';
export class BoxStepper extends BoxSlider {
    defaults() {
        return {
            min: 0,
            max: 10,
            value: 6,
            precision: 0
        };
    }
    mutabilities() {
        return {
            precision: 'never'
        };
    }
}
//# sourceMappingURL=BoxStepper.js.map