import { BetterObject } from '@bhbr/better-things';
import { vertex } from './vertex.js';
export declare class Transform extends BetterObject {
    anchor: vertex;
    angle: number;
    scale: number;
    shift: vertex;
    defaults(): object;
    static identity(): Transform;
    det(): number;
    toCSSString(): string;
    toString(): string;
    toMatrix(): string;
    a(): number;
    b(): number;
    c(): number;
    d(): number;
    e(): number;
    f(): number;
    inverse(): Transform;
    appliedTo(p: vertex): vertex;
    appliedToVertices(vertices: Array<vertex>): Array<vertex>;
    copy(): Transform;
    rightComposedWith(t: Transform): Transform;
    rightComposeWith(t: Transform): void;
    leftComposeWith(t: Transform): void;
    leftComposedWith(t: Transform): Transform;
    interpolate(newTransform: Transform, weight: number): Transform;
    withoutAnchor(): Transform;
    equals(t: Transform): boolean;
}
//# sourceMappingURL=Transform.d.ts.map