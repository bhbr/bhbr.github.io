import { NumberListValuedFunctionBox } from './NumberListValuedFunctionBox.js';
import { numberArrayCumAverage } from '../../../../core/functions/numberArray.js';
import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
export class CumAverageBox extends NumberListValuedFunctionBox {
    defaults() {
        return {
            name: 'cumavg',
            argument: [],
            outputProperties: [
                { name: 'value', type: 'Array<number>' }
            ]
        };
    }
    result() {
        return numberArrayCumAverage(this.argument);
    }
    mutabilities() { return {}; }
}
export class CumAverageBoxCreator extends DraggingCreator {
    createMobject() {
        return new CumAverageBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CumAverageBox.js.map