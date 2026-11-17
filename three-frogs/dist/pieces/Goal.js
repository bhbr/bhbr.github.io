import { PlayPiece } from './PlayPiece.js';
import { GOAL_SIZE, GOAL_ICON_SIZE } from '../constants.js';
export class Goal extends PlayPiece {
    defaults() {
        return {
            imageLocation: '../assets/goal.png',
            frameWidth: GOAL_SIZE,
            frameHeight: GOAL_SIZE
        };
    }
}
export class GoalIcon extends Goal {
    defaults() {
        return {
            frameWidth: GOAL_ICON_SIZE,
            frameHeight: GOAL_ICON_SIZE
        };
    }
}
