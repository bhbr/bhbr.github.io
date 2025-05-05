import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { DEGREES } from '../../core/constants.js';
import { vertexOrigin, vertexIsZero, vertexOpposite, vertexAdd, vertexSubtract, vertexCentrallyRotatedBy, vertexCentrallyScaledBy, vertexTranslatedBy, vertexInterpolate } from '../../core/functions/vertex.js';
export class Transform extends ExtendedObject {
    defaults() {
        return {
            anchor: vertexOrigin(),
            angle: 0,
            scale: 1,
            shift: vertexOrigin()
        };
    }
    static identity() { return new Transform(); }
    det() { return this.scale ** 2; }
    toCSSString() {
        let str1 = vertexIsZero(this.shift) ? `` : `translate(${this.shift[0]}px,${this.shift[1]}px) `;
        let str2 = vertexIsZero(this.anchor) || (this.scale == 1 && this.angle == 0) ? `` : `translate(${-this.anchor[0]}px,${-this.anchor[1]}px) `;
        let str3 = this.scale == 1 ? `` : `scale(${this.scale}) `;
        let str4 = this.angle == 0 ? `` : `rotate(${-this.angle / DEGREES}deg) `;
        let str5 = vertexIsZero(this.anchor) || (this.scale == 1 && this.angle == 0) ? `` : `translate(${this.anchor[0]}px,${this.anchor[1]}px) `;
        return (str1 + str2 + str3 + str4 + str5).replace(`  `, ` `).trim();
    }
    toString() {
        // for debugging
        return `Transform(anchor: ${this.anchor}, angle: ${this.angle / DEGREES}°, scale: ${this.scale}, shift: ${this.shift})`;
    }
    // Matrix representation just in case anyone wants to do something fancy
    toMatrix() {
        // for debugging
        return `[[${this.a()} ${this.b()}] [${this.c()} ${this.d()}]]; [${this.e()} ${this.f()}]`;
    }
    a() { return this.scale * Math.cos(this.angle); }
    b() { return this.scale * Math.sin(this.angle); }
    c() { return -this.scale * Math.sin(this.angle); }
    d() { return this.scale * Math.cos(this.angle); }
    e() { return (1 - this.a()) * this.anchor[0] - this.b() * this.anchor[1] + this.shift[0]; }
    f() { return -this.c() * this.anchor[0] + (1 - this.d()) * this.anchor[1] + this.shift[1]; }
    inverse() {
        let t = new Transform({
            angle: -this.angle,
            scale: 1 / this.scale
        });
        t.update({
            shift: vertexOpposite(t.appliedTo(this.shift)),
            anchor: this.anchor
        });
        return t;
    }
    appliedTo(p) {
        return [
            this.a() * p[0] + this.b() * p[1] + this.e(),
            this.c() * p[0] + this.d() * p[1] + this.f()
        ];
    }
    appliedToVertices(vertices) {
        // This method also accepts an undertyped argument
        let ret = [];
        for (let v of vertices) {
            ret.push(this.appliedTo(v));
        }
        return ret;
    }
    copy() {
        let ct = new Transform();
        ct.copyFrom(this);
        return ct;
    }
    rightComposedWith(t) {
        let v = vertexSubtract(vertexAdd(t.shift, t.anchor), this.anchor);
        let w = vertexSubtract(vertexAdd(this.shift, this.anchor), t.anchor);
        return new Transform({
            anchor: t.anchor,
            scale: this.scale * t.scale,
            angle: this.angle + t.angle,
            shift: vertexTranslatedBy(vertexCentrallyScaledBy(vertexCentrallyRotatedBy(v, this.angle), this.scale), w)
        });
    }
    rightComposeWith(t) {
        this.copyFrom(this.rightComposedWith(t));
    }
    leftComposeWith(t) {
        this.copyFrom(this.leftComposedWith(t));
    }
    leftComposedWith(t) {
        return t.rightComposedWith(this);
    }
    interpolate(newTransform, weight) {
        return new Transform({
            anchor: vertexInterpolate(this.anchor, newTransform.anchor, weight),
            angle: (1 - weight) * this.angle + weight * newTransform.angle,
            scale: (1 - weight) * this.scale + weight * newTransform.scale,
            shift: vertexInterpolate(this.shift, newTransform.shift, weight)
        });
    }
    withoutAnchor() {
        let t = this.copy();
        t.anchor = vertexOrigin();
        return t;
    }
    equals(t) {
        let tolerance = 1e-6;
        return (Math.abs(this.a() - t.a()) < tolerance
            && Math.abs(this.b() - t.b()) < tolerance
            && Math.abs(this.c() - t.c()) < tolerance
            && Math.abs(this.d() - t.d()) < tolerance
            && Math.abs(this.e() - t.e()) < tolerance
            && Math.abs(this.f() - t.f()) < tolerance);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Transform.js.map