import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
import { BinaryOperatorBox, AddBox, SubtractBox, MultiplyBox, DivideBox } from './BinaryOperatorBox.js';
export class BinaryOperatorBoxCreator extends DraggingCreator {
    setup() {
        super.setup();
        this.creation.operatorLabel.update({
            text: this.creation.operatorLabelText()
        });
    }
    createMobject() {
        return new BinaryOperatorBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class AddBoxCreator extends BinaryOperatorBoxCreator {
    createMobject() {
        return new AddBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class SubtractBoxCreator extends BinaryOperatorBoxCreator {
    createMobject() {
        return new SubtractBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class MultiplyBoxCreator extends BinaryOperatorBoxCreator {
    createMobject() {
        return new MultiplyBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class DivideBoxCreator extends BinaryOperatorBoxCreator {
    createMobject() {
        return new DivideBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BinaryOperatorBoxCreator.js.map