import { ConPoint } from './ConPoint.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
export class FreePoint extends ConPoint {
    defaults() {
        return {
            screenEventHandler: ScreenEventHandler.Parent
        };
    }
    mutabilities() {
        return {
            screenEventHandler: 'never'
        };
    }
    onPointerDown(e) {
        this.startDragging(e);
    }
    onPointerMove(e) {
        this.dragging(e);
    }
    onPointerUp(e) {
        this.endDragging(e);
    }
}
//# sourceMappingURL=FreePoint.js.map