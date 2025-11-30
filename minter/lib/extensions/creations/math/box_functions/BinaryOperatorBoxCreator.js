import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
import { BinaryOperatorBox, AddBox, SubtractBox, MultiplyBox, DivideBox } from './BinaryOperatorBox.js';
export class BinaryOperatorBoxCreator extends DraggingCreator {
    defaults() {
        return {
            pointOffset: [-40, -40]
        };
    }
    setup() {
        super.setup();
        this.creation.operatorLabel.update({
            text: this.creation.operatorLabelText()
        });
    }
    createMobject() {
        return new BinaryOperatorBox();
    }
    mutabilities() { return {}; }
}
export class AddBoxCreator extends BinaryOperatorBoxCreator {
    defaults() {
        return {
            helpText: 'Adds two input numbers.'
        };
    }
    createMobject() {
        return new AddBox();
    }
    mutabilities() { return {}; }
}
export class SubtractBoxCreator extends BinaryOperatorBoxCreator {
    defaults() {
        return {
            helpText: 'Subtracts two input numbers.'
        };
    }
    createMobject() {
        return new SubtractBox();
    }
    mutabilities() { return {}; }
}
export class MultiplyBoxCreator extends BinaryOperatorBoxCreator {
    defaults() {
        return {
            helpText: 'Multiplies two input numbers.'
        };
    }
    createMobject() {
        return new MultiplyBox();
    }
    mutabilities() { return {}; }
}
export class DivideBoxCreator extends BinaryOperatorBoxCreator {
    defaults() {
        return {
            helpText: 'Divides two input numbers.'
        };
    }
    createMobject() {
        return new DivideBox();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BinaryOperatorBoxCreator.js.map