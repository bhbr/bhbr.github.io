import { ConStraitConstructor } from '../ConStraitConstructor.js';
import { ConLine } from './ConLine.js';
export class ConLineConstructor extends ConStraitConstructor {
    constructor(args = {}) {
        super(args);
    }
    defaults() {
        return {
            line: new ConLine()
        };
    }
    mutabilities() {
        return {
            line: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.line);
        this.startFreePoint.addDependency('midpoint', this.line, 'startPoint');
        this.endFreePoint.addDependency('midpoint', this.line, 'endPoint');
        this.addDependency('penStrokeColor', this.line, 'strokeColor');
        this.line.update({
            startPoint: this.startFreePoint.midpoint,
            endPoint: this.endFreePoint.midpoint,
            strokeColor: this.penStrokeColor
        });
    }
}
//# sourceMappingURL=ConLineConstructor.js.map