import { ConCircle } from './ConCircle.js';
import { Constructor } from '../Constructor.js';
import { FreePoint } from '../FreePoint.js';
export class ConCircleConstructor extends Constructor {
    defaults() {
        return {
            freeMidpoint: new FreePoint(),
            freeOuterPoint: new FreePoint(),
            circle: new ConCircle(),
            strokeWidth: 1,
            fillOpacity: 0
        };
    }
    mutabilities() {
        return {
            freeMidpoint: 'never',
            freeOuterPoint: 'never',
            circle: 'never'
        };
    }
    setup() {
        super.setup();
        let sp = this.construction.snappedPointForVertex(this.getStartPoint());
        let sp1 = (sp === null) ? this.getStartPoint() : sp.midpoint;
        this.addDependency('penStrokeColor', this.freeMidpoint, 'strokeColor');
        this.addDependency('penFillColor', this.freeMidpoint, 'fillColor');
        this.addDependency('penStrokeColor', this.freeOuterPoint, 'strokeColor');
        this.addDependency('penFillColor', this.freeOuterPoint, 'fillColor');
        this.addDependency('penStrokeColor', this.circle, 'strokeColor');
        this.freeMidpoint.addDependency('midpoint', this.circle, 'midpoint');
        this.freeOuterPoint.addDependency('midpoint', this.circle, 'outerPoint');
        this.freeMidpoint.update({
            midpoint: sp1,
            strokeColor: this.penStrokeColor,
            fillColor: this.penFillColor
        }, false);
        this.freeOuterPoint.update({
            midpoint: this.getEndPoint(),
            strokeColor: this.penStrokeColor,
            fillColor: this.penFillColor
        }, false);
        this.circle.update({
            midpoint: this.freeMidpoint.midpoint,
            outerPoint: this.freeOuterPoint.midpoint,
            fillOpacity: 0
        }, false);
        this.add(this.freeMidpoint);
        this.add(this.freeOuterPoint);
        this.add(this.circle);
    }
    updateFromTip(q) {
        super.updateFromTip(q);
        this.freeOuterPoint.update({ midpoint: q });
        this.update();
    }
}
//# sourceMappingURL=ConCircleConstructor.js.map