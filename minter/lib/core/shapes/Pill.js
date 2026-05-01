import { CurvedLine } from '../../core/vmobjects/CurvedLine.js';
import { vertexCentrallyScaledBy, vertexTranslatedBy } from '../../core/functions/vertex.js';
export class Pill extends CurvedLine {
    defaults() {
        return {
            radius: 50,
            width: 200,
            nbPointsPerArc: 12
        };
    }
    updateBezierPoints() {
        let newBezierPoints = [];
        let d = this.radius * 4 / 3 * Math.tan(Math.PI / (4 * this.nbPointsPerArc));
        let leftArcCenter = [this.radius, this.radius];
        for (let i = 0; i <= this.nbPointsPerArc; i++) {
            let theta = i / this.nbPointsPerArc * Math.PI + Math.PI / 2;
            let radialUnitVector = [Math.cos(theta), Math.sin(theta)];
            let tangentUnitVector = [-Math.sin(theta), Math.cos(theta)];
            let anchorPoint = vertexTranslatedBy(leftArcCenter, vertexCentrallyScaledBy(radialUnitVector, this.radius));
            let leftControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, -d));
            let rightControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, d));
            if (i != 0) {
                newBezierPoints.push(leftControlPoint);
            }
            newBezierPoints.push(anchorPoint);
            if (i != this.nbPointsPerArc) {
                newBezierPoints.push(rightControlPoint);
            }
        }
        newBezierPoints.push([this.width - this.radius, 0]);
        newBezierPoints.push([this.radius, 0]);
        let rightArcCenter = [this.width - this.radius, this.radius];
        for (let i = 0; i <= this.nbPointsPerArc; i++) {
            let theta = i / this.nbPointsPerArc * Math.PI - Math.PI / 2;
            let radialUnitVector = [Math.cos(theta), Math.sin(theta)];
            let tangentUnitVector = [-Math.sin(theta), Math.cos(theta)];
            let anchorPoint = vertexTranslatedBy(rightArcCenter, vertexCentrallyScaledBy(radialUnitVector, this.radius));
            let leftControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, -d));
            let rightControlPoint = vertexTranslatedBy(anchorPoint, vertexCentrallyScaledBy(tangentUnitVector, d));
            if (i != 0) {
                newBezierPoints.push(leftControlPoint);
            }
            newBezierPoints.push(anchorPoint);
            if (i != this.nbPointsPerArc) {
                newBezierPoints.push(rightControlPoint);
            }
        }
        this.bezierPoints = newBezierPoints;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Pill.js.map