import { vertexCopy } from '../../../../core/functions/vertex.js';
import { FreePoint } from '../FreePoint.js';
import { Constructor } from '../Constructor.js';
export class ConStraitConstructor extends Constructor {
    defaults() {
        return {
            startFreePoint: new FreePoint(),
            endFreePoint: new FreePoint()
        };
    }
    mutabilities() {
        return {
            startFreePoint: 'never',
            endFreePoint: 'never'
        };
    }
    setup() {
        super.setup();
        let sp = this.construction.snappedPointForVertex(this.getStartPoint());
        let sp1 = (sp === null) ? this.getStartPoint() : sp.midpoint;
        this.add(this.startFreePoint);
        this.add(this.endFreePoint);
        this.addDependency('penStrokeColor', this.startFreePoint, 'strokeColor');
        this.addDependency('penFillColor', this.startFreePoint, 'fillColor');
        this.addDependency('penStrokeColor', this.endFreePoint, 'strokeColor');
        this.addDependency('penFillColor', this.endFreePoint, 'fillColor');
        this.addDependency('getEndPoint', this.endFreePoint, 'midpoint');
        this.startFreePoint.update({ midpoint: sp1 });
        this.endFreePoint.update({
            midpoint: this.getEndPoint() ?? vertexCopy(sp1)
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        this.update();
        if (redraw) {
            this.view.redraw();
        }
    }
}
//# sourceMappingURL=ConStraitConstructor.js.map