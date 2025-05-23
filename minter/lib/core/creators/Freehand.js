import { Creator } from '../../core/creators/Creator.js';
import { PolygonalLine } from '../../core/vmobjects/PolygonalLine.js';
import { Color } from '../../core/classes/Color.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class Freehand extends Creator {
    defaults() {
        return {
            screenEventHandler: ScreenEventHandler.Below,
            line: new PolygonalLine({
                closed: false
            }),
            penStrokeColor: Color.white(),
            penStrokeWidth: 1.0,
            penStrokeLength: 2.0
        };
    }
    mutabilities() {
        return {
            screenEventHandler: 'never',
            line: 'never'
        };
    }
    setup() {
        super.setup();
        this.line.update({
            vertices: this.creationStroke
        });
        this.addDependency('penStrokeColor', this.line, 'strokeColor');
        this.add(this.line);
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, false);
        if (redraw) {
            this.line.view.redraw();
            this.view.redraw();
        }
    }
    dissolve() {
        this.update({
            frameWidth: this.line.getWidth(),
            frameHeight: this.line.getHeight()
        });
        let par = this.parent;
        par.creator = null;
        par.remove(this);
        if (this.view.visible) {
            par.addToContent(this);
        }
    }
}
//# sourceMappingURL=Freehand.js.map