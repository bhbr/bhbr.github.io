import { Frog } from './Frog.js';
import { ScreenEventHandler } from '@bhbr/minter';
export class GhostFrog extends Frog {
    defaults() {
        return {
            opacity: 0.5,
            screenEventHandler: ScreenEventHandler.Parent
        };
    }
}
//# sourceMappingURL=GhostFrog.js.map