import { NumberValuedFunctionBox } from './NumberValuedFunctionBox.js';
import { numberArraySum } from '../../core/functions/numberArray.js';
import { DraggingCreator } from '../../core/creators/DraggingCreator.js';
export class SumBox extends NumberValuedFunctionBox {
    defaults() {
        return {
            name: 'sum',
            argument: [],
            inputProperties: [
                { name: 'list', displayName: null, type: 'Array<number>' }
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