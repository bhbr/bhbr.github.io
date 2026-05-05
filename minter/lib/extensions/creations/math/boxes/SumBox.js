import { NumberValuedFunctionBox } from './NumberValuedFunctionBox.js';
import { numberArraySum } from '../../../../core/functions/numberArray.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class SumBox extends NumberValuedFunctionBox {
    defaults() {
        return {
            name: 'sum',
            argument: [],
            outputProperties: [
                { name: 'value', displayName: 'sum', type: 'number' }
            ]
        };
    }
    result() {
        return numberArraySum(this.argument);
    }
    mutabilities() { return {}; }
}
export class SumBoxCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'Sum of a list of numbers.',
            pointOffset: [-40, -40]
        };
    }
    createMobject() {
        return new SumBox();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SumBox.js.map