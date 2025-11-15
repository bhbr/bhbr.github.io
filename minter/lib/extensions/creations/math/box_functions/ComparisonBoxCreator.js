import { DraggingCreator } from '../../../../core/creators/DraggingCreator.js';
import { ComparisonBox, LessThanBox, LessThanOrEqualBox, GreaterThanBox, GreaterThanOrEqualBox, EqualsBox, NotEqualsBox } from './ComparisonBox.js';
export class ComparisonBoxCreator extends DraggingCreator {
    setup() {
        super.setup();
        this.creation.operatorLabel.update({
            text: this.creation.operatorLabelText()
        });
    }
    createMobject() {
        return new ComparisonBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class LessThanBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new LessThanBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class LessThanOrEqualBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new LessThanOrEqualBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class GreaterThanBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new GreaterThanBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class GreaterThanOrEqualBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new GreaterThanOrEqualBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class EqualsBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new EqualsBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class NotEqualsBoxCreator extends ComparisonBoxCreator {
    createMobject() {
        return new NotEqualsBox();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ComparisonBoxCreator.js.map