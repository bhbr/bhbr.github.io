import { NumberValuedFunctionBox } from './NumberValuedFunctionBox.js';
import { numberArraySum } from '../../../../core/functions/numberArray.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class AverageBox extends NumberValuedFunctionBox {
    defaults() {
        return {
            name: 'mean',
            argument: [],
            outputProperties: [
                { name: 'value', displayName: 'mean', type: 'number' }
            ]
        };
    }
    result() {
        if (this.argument.length > 0) {
            return numberArraySum(this.argument) / this.argument.length;
        }
        else {
            return NaN;
        }
    }
    mutabilities() { return {}; }
}
export class AverageBoxCreator extends DraggingCreator {
    defaults() {
        return {
            helpText: 'Average of a list of numbers.',
            pointOffset: [-40, -40]
        };
    }
    createMobject() {
        return new AverageBox();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=AverageBox.js.map