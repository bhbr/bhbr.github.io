export function isVertex(obj) {
    if (!(obj instanceof Array)) {
        return false;
    }
    if (obj.length != 2) {
        return false;
    }
    return (typeof obj[0] == 'number') && (typeof obj[1] == 'number');
}
export function isVertexArray(obj) {
    if (!(obj instanceof Array)) {
        return false;
    }
    return obj.every((el) => isVertex(el));
}
export function vertexX(v) { return v[0]; }
export function vertexY(v) { return v[1]; }
export function vertexOrigin() { return [0, 0]; }
export function vertexDot(v, w) {
    return v[0] * w[0] + v[1] * w[1];
}
export function vertexNorm2(v) {
    return v[0] ** 2 + v[1] ** 2;
}
export function vertexNorm(v) {
    return Math.sqrt(vertexNorm2(v));
}
export function vertexCloseTo(v, w, tolerance = 1e-6) {
    if (vertexIsNaN(v)) {
        return false;
    }
    if (vertexIsNaN(w)) {
        return false;
    }
    if (!tolerance) {
        tolerance = 1;
    }
    return vertexNorm2(vertexSubtract(v, w)) < tolerance ** 2;
}
export function vertexIsZero(v) {
    return v[0] == 0 && v[1] == 0;
}
export function vertexEquals(v, w) {
    return vertexCloseTo(v, w, 1e-6);
}
export function vertexArrayEquals(va, wa) {
    if (va.length != wa.length) {
        return false;
    }
    for (let i = 0; i < va.length; i++) {
        if (!vertexEquals(va[i], wa[i])) {
            return false;
        }
    }
    return true;
}
export function vertexCopyFrom(v, w) {
    v[0] = w[0];
    v[1] = w[1];
}
export function vertexUpdate(v, w) {
    vertexCopyFrom(v, w);
}
export function vertexCopy(v) {
    return [v[0], v[1]];
}
export function vertexImageUnder(v, t) {
    return [t.a() * v[0] + t.b() * v[1] + t.e(), t.c() * v[0] + t.d() * v[1] + t.f()];
}
export function vertexApply(v, t) {
    vertexCopyFrom(v, vertexImageUnder(v, t));
}
export function vertexTranslatedBy(v, w) {
    return vertexAdd(v, w);
}
export function vertexTranslateBy(v, w) {
    vertexCopyFrom(v, vertexTranslatedBy(v, w));
}
export function vertexCentrallyRotatedBy(v, angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return [c * v[0] + s * v[1], -s * v[0] + c * v[1]];
}
export function vertexRotatedBy(v, angle, center) {
    if (vertexIsZero(center)) {
        return vertexCentrallyRotatedBy(v, angle);
    }
    let w = vertexSubtract(v, center);
    let rw = vertexCentrallyRotatedBy(w, angle);
    return vertexAdd(rw, center);
}
export function vertexCentrallyRotateBy(v, angle) {
    vertexCopyFrom(v, vertexCentrallyRotatedBy(v, angle));
}
export function vertexRotateBy(v, angle, center) {
    if (vertexIsZero(center)) {
        vertexCopyFrom(v, vertexCentrallyRotatedBy(v, angle));
    }
    vertexCopyFrom(v, vertexRotatedBy(v, angle, center));
}
export function vertexCentrallyScaledBy(v, scale) {
    return [scale * v[0], scale * v[1]];
}
export function vertexScaledBy(v, scale, center) {
    if (center == undefined || vertexIsZero(center)) {
        return vertexCentrallyScaledBy(v, scale);
    }
    let w = vertexSubtract(v, center);
    let rw = vertexCentrallyScaledBy(w, scale);
    return vertexAdd(rw, center);
}
function vertexCentrallyScaleBy(v, scale) {
    vertexCopyFrom(v, vertexCentrallyScaledBy(v, scale));
}
export function vertexScaleBy(v, scale, center) {
    if (center == undefined) {
        vertexCopyFrom(v, vertexCentrallyScaledBy(v, scale));
    }
    vertexCopyFrom(v, vertexScaledBy(v, scale, center));
}
export function vertexNormalized(v) {
    let l = 1 / vertexNorm(v);
    return vertexCentrallyScaledBy(v, l);
}
export function vertexNormalize(v) {
    vertexCopyFrom(v, vertexNormalized(v));
}
export function vertexAdd(v, w) {
    return [v[0] + w[0], v[1] + w[1]];
}
export function vertexMultiply(v, factor) {
    return [v[0] * factor, v[1] * factor];
}
export function vertexDivide(v, factor) {
    return [v[0] / factor, v[1] / factor];
}
export function vertexOpposite(v) {
    return [-v[0], -v[1]];
}
export function vertexSubtract(v, w) {
    return [v[0] - w[0], v[1] - w[1]];
}
export function vertexIsNaN(v) {
    return (isNaN(v[0]) || isNaN(v[1]));
}
export function vertexInterpolate(v, w, weight) {
    return [v[0] + weight * (w[0] - v[0]), v[1] + weight * (w[1] - v[1])];
}
export function vertexToString(v) {
    return `[${v[0]}, ${v[1]}]`;
}
export function vertexInnerProduct(v, w) {
    return vertexDot(v, w);
}
export function vertexOuterProduct(v, w) {
    return v[0] * w[1] - v[1] * w[0];
}
export function vertexArrayInterpolate(vtxArray1, vtxArray2, weight) {
    let interpolatedVertexArray = [];
    for (let i = 0; i < vtxArray1.length; i++) {
        interpolatedVertexArray.push(vertexInterpolate(vtxArray1[i], vtxArray2[i], weight));
    }
    return interpolatedVertexArray;
}
export function vertexArrayImageUnder(vtxArray, transform) {
    let image = [];
    for (let i = 0; i < vtxArray.length; i++) {
        image.push(vertexImageUnder(vtxArray[i], transform));
    }
    return image;
}
//# sourceMappingURL=vertex.js.map