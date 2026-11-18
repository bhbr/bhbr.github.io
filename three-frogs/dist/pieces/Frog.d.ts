import { PlayPiece } from './PlayPiece.js';
import { ScreenEvent } from '@bhbr/minter';
import { Position } from '../paper/FrogPaper.js';
import { vertex } from '@bhbr/affr2';
export declare class Frog extends PlayPiece {
    color: string;
    dragStartPoint?: vertex;
    previousAnchor?: vertex;
    snapPoints: Array<vertex>;
    position: Position;
    startPosition: any;
    snappedPosition?: Position;
    defaults(): object;
    setup(): void;
    update(args?: object, redraw?: boolean): void;
    startDragging(e: ScreenEvent): void;
    dragging(e: ScreenEvent): void;
    endDragging(e: ScreenEvent): void;
}
//# sourceMappingURL=Frog.d.ts.map