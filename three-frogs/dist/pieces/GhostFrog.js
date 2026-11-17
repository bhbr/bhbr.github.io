import { Frog } from './Frog.js';
import { ScreenEventHandler } from '@bhbr/minter';
import { GHOST_FROG_OPACITY } from '../constants.js';
export class GhostFrog extends Frog {
    defaults() {
        return {
            opacity: GHOST_FROG_OPACITY,
            screenEventHandler: ScreenEventHandler.Parent
        };
    }
}
