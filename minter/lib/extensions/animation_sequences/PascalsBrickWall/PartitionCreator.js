import { Partition } from './Partition.js';
import { DraggingCreator } from '../../../core/creators/DraggingCreator.js';
export class PartitionCreator extends DraggingCreator {
    createMobject() {
        let p = this.getStartPoint();
        return new Partition({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height
        });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PartitionCreator.js.map