import { NumberListValuedFunctionBox } from './NumberListValuedFunctionBox.js';
import { numberArrayCumSum } from '../../../../core/functions/numberArray.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class CumSumBox extends NumberListValuedFunctionBox {
    defaults() {
        return {
            name: 'cumsum',
            argument: [],
            outputProperties: [
                { name: 'value', type: 'Array<number>' }
            ]
        };
    }
    result() {
        return numberArrayCumSum(this.argument);
    }
    mutabilities() { return {}; }
}
export class CumSumBoxCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'Cumulative sums of a list of numbers.'
        };
    }
    createMobject() {
        return new CumSumBox();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CumSumBox.js.map