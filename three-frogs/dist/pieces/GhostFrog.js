import { Frog } from './Frog.js';
import { GHOST_FROG_OPACITY } from '../constants.js';
import { ScreenEventHandler } from '@bhbr/minter';
export class GhostFrog extends Frog {
    defaults() {
        return {
            opacity: GHOST_FROG_OPACITY,
            screenEventHandler: ScreenEventHandler.Parent
        };
    }
}