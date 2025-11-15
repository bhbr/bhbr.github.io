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
    createMobject() {
        return new SumBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=SumBox.js.map