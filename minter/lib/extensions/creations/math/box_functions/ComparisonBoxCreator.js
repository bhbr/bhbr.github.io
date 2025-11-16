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
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a < b, otherwise 0. '
        };
    }
    createMobject() {
        return new LessThanBox();
    }
    mutabilities() { return {}; }
}
export class LessThanOrEqualBoxCreator extends ComparisonBoxCreator {
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a &le; b, otherwise 0. '
        };
    }
    createMobject() {
        return new LessThanOrEqualBox();
    }
    mutabilities() { return {}; }
}
export class GreaterThanBoxCreator extends ComparisonBoxCreator {
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a > b, otherwise 0. '
        };
    }
    createMobject() {
        return new GreaterThanBox();
    }
    mutabilities() { return {}; }
}
export class GreaterThanOrEqualBoxCreator extends ComparisonBoxCreator {
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a &ge; b, otherwise 0. '
        };
    }
    createMobject() {
        return new GreaterThanOrEqualBox();
    }
    mutabilities() { return {}; }
}
export class EqualsBoxCreator extends ComparisonBoxCreator {
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a = b, otherwise 0. '
        };
    }
    createMobject() {
        return new EqualsBox();
    }
    mutabilities() { return {}; }
}
export class NotEqualsBoxCreator extends ComparisonBoxCreator {
    defaults() {
        return {
            helpText: 'Compares two input numbers a and b: output is 1 if a &ne; b, otherwise 0. '
        };
    }
    createMobject() {
        return new NotEqualsBox();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ComparisonBoxCreator.js.map