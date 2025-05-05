import { Creator } from '../../../core/creators/Creator.js';
import { Swing } from './Swing.js';
import { vertexSubtract, vertexNorm } from '../../../core/functions/vertex.js';
export class SwingCreator extends Creator {
    defaults() {
        return {
            swing: new Swing()
        };
    }
    mutabilities() {
        return {
            swing: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.swing);
        this.swing.update({
            anchor: this.getStartPoint()
        }, false);
        this.swing.hideLinks();
    }
    createMobject() {
        return this.swing;
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        var dr = vertexSubtract(q, this.getStartPoint());
        dr = vertexSubtract(dr, [this.view.frame.width / 2, this.swing.fixtureHeight]);
        let length = vertexNorm(dr);
        let angle = -Math.atan2(dr[0], dr[1]);
        this.swing.update({
            maxLength: length,
            length: 1,
            initialAngle: angle
        }, redraw);
        this.swing.hideLinks();
    }
    dissolve() {
        super.dissolve();
        this.swing.update({
            initialTime: Date.now()
        });
        this.swing.outputList.update();
        this.swing.run();
    }
}
//# sourceMappingURL=SwingCreator.js.map