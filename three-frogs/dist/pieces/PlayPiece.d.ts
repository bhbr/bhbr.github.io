import { Mobject, ImageView } from '@bhbr/minter';
import { vertex } from '@bhbr/affr2';
import { FrogPaper, Position } from '../paper/FrogPaper.js';
export declare class PlayPiece extends Mobject {
    view: ImageView;
    position: [number, number];
    paper?: FrogPaper;
    defaults(): object;
    get imageLocation(): string;
    set imageLocation(newValue: string);
    placeAt(v: vertex): void;
    positionAt(pos: Position): void;
}
//# sourceMappingURL=PlayPiece.d.ts.map