import { PascalsBrickWall } from './PascalsBrickWall.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class BrickWallCreator extends DraggingCreator {
    createMobject() {
        let p = this.getStartPoint();
        return new PascalsBrickWall({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=BrickWallCreator.js.map