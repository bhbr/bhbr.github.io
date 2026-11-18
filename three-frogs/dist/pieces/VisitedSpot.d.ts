import { Circle, Color } from '@bhbr/minter';
import { Position } from '../paper/FrogPaper.js';
export declare class VisitedSpot extends Circle {
    position: Position;
    colors: Record<string, Color>;
    defaults(): object;
    setColor(newColorName: string): void;
}
//# sourceMappingURL=VisitedSpot.d.ts.map