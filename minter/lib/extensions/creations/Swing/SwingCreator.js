import { Creator } from '../../../core/creators/Creator.js';
import { Swing } from './Swing.js';
import { vertexSubtract, vertexNorm } from '../../../core/functions/vertex.js';
export class SwingCreator extends Creator {
    defaults() {
        return {
            creation: new Swing({
                length: 0
            })
        };
    }
    mutabilities() {
        return {
            swing: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.creation);
        this.creation.hideLinks();
    }
    createMobject() {
        return this.creation;
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        var dr = vertexSubtract(q, this.getStartPoint());
        let length = vertexNorm(dr);
        let angle = -Math.atan2(dr[0], dr[1]);
        this.creation.update({
            maxLength: length,
            length: 1,
            initialAngle: angle
        }, redraw);
        this.creation.hideLinks();
    }
    dissolve() {
        super.dissolve();
        this.creation.update({
            initialTime: Date.now()
        });
        this.creation.outputList.update();
        this.creation.run();
    }
}
//# sourceMappingURL=SwingCreator.js.map