import { NumberValuedFunctionBox } from './NumberValuedFunctionBox.js';
import { numberArraySum } from '../../core/functions/numberArray.js';
import { DraggingCreator } from '../../core/creators/DraggingCreator.js';
export class AverageBox extends NumberValuedFunctionBox {
    defaults() {
        return {
            name: 'avg',
            argument: [],
            inputProperties: [
                { name: 'argument', type: 'Array<number>' }
            ]
        };
    }
    result() {
        return numberArraySum(this.argument) / this.argument.length;
    }
    mutabilities() { return {}; }
}
export class AverageBoxCreator extends DraggingCreator {
    createMobject() {
        return new AverageBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=AverageBox.js.map