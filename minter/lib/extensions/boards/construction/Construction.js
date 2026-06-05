// imports for Construction
import { ConPoint } from './ConPoint.js';
import { FreePoint } from './FreePoint.js';
import { ConLineConstructor } from './straits/ConLine/ConLineConstructor.js';
import { ConRayConstructor } from './straits/ConRay/ConRayConstructor.js';
import { ConSegmentConstructor } from './straits/ConSegment/ConSegmentConstructor.js';
import { ConCircleConstructor } from './ConCircle/ConCircleConstructor.js';
import { ConStrait } from './straits/ConStrait.js';
import { IntersectionPoint } from './IntersectionPoint.js';
import { Board } from '../../../core/boards/Board.js';
import { Color } from '../../../core/classes/Color.js';
import { vertexCloseTo } from '../../../core/functions/vertex.js';
import { getPaper } from '../../../core/functions/getters.js';
export class Construction extends Board {
    defaults() {
        return {
            points: [],
            constructedMobjects: [],
            buttonNames: [
                'DragButton',
                'StraitButton',
                'ConCircleButton'
            ]
        };
    }
    mutabilities() {
        return {
            points: 'never',
            constructedMobjects: 'never',
            buttonNames: 'never'
        };
    }
    setup() {
        super.setup();
        this.background.update({
            fillColor: Color.black()
        });
    }
    snapped(v1, v2) {
        return vertexCloseTo(v1, v2, 10);
    }
    snappedPointForVertex(v) {
        for (let p of this.points) {
            if (this.snapped(v, p.midpoint)) {
                return p;
            }
        }
        return null;
    }
    addPoint(p) {
        this.addToContent(p);
        this.points.push(p);
        return true;
    }
    freePoints() {
        let ret = [];
        for (let p of this.points) {
            if (p instanceof FreePoint) {
                ret.push(p);
            }
        }
        return ret;
    }
    createCreator(type) {
        switch (type) {
            case 'segment':
                let sg = new ConSegmentConstructor({
                    creationStroke: this.creationStroke,
                    construction: this
                });
                return sg;
            case 'ray':
                let ray = new ConRayConstructor({
                    creationStroke: this.creationStroke,
                    construction: this
                });
                return ray;
            case 'line':
                let line = new ConLineConstructor({
                    creationStroke: this.creationStroke,
                    construction: this
                });
                return line;
            case 'circle':
                let c = new ConCircleConstructor({
                    creationStroke: this.creationStroke,
                    construction: this
                });
                return c;
        }
        return super.createCreator(type);
    }
    startCreating(e) {
        let v = this.sensor.localEventVertex(e);
        let p = this.snappedPointForVertex(v);
        if (this.creationMode == 'freehand') {
            if (p === null) { // starting a freehand drawing
                super.startCreating(e);
            }
            else if (p instanceof FreePoint) { // dragging a free point
                this.sensor.eventTarget = p;
                p.startDragging(e);
            } // hitting any other point does nothing if in freehand mode
            return;
        }
        this.creationStroke.push(v);
        this.creator = this.createCreator(this.creationMode);
        this.addToContent(this.creator);
    }
    creating(e) {
        if (this.creationMode == 'freehand') {
            super.creating(e);
            return;
        }
        let p = this.sensor.localEventVertex(e);
        for (let fq of this.points) {
            let q = fq.midpoint;
            if (this.snapped(p, q)) {
                p = q;
                break;
            }
        }
        this.creator.updateFromTip(p);
    }
    addToContent(mob) {
        super.addToContent(mob);
        if (mob instanceof ConPoint) {
            this.points.push(mob);
            if (mob instanceof FreePoint && !this.points.includes(mob)) {
                this.points.push(mob);
            }
        }
    }
    integrate(mob) {
        this.remove(mob);
        let p1 = this.snappedPointForVertex(mob.getStartPoint()) ?? new FreePoint({ midpoint: mob.getStartPoint() });
        let p2 = this.snappedPointForVertex(mob.getEndPoint()) ?? new FreePoint({ midpoint: mob.getEndPoint() });
        this.addToContent(p1);
        this.addToContent(p2);
        let cm;
        if (mob instanceof ConSegmentConstructor) {
            cm = mob.segment;
            p1.addDependency('midpoint', cm, 'startPoint');
            p2.addDependency('midpoint', cm, 'endPoint');
        }
        else if (mob instanceof ConRayConstructor) {
            cm = mob.ray;
            p1.addDependency('midpoint', cm, 'startPoint');
            p2.addDependency('midpoint', cm, 'endPoint');
        }
        else if (mob instanceof ConLineConstructor) {
            cm = mob.line;
            p1.addDependency('midpoint', cm, 'startPoint');
            p2.addDependency('midpoint', cm, 'endPoint');
        }
        else if (mob instanceof ConCircleConstructor) {
            cm = mob.circle;
            p1.addDependency('midpoint', cm, 'midpoint');
            p2.addDependency('midpoint', cm, 'outerPoint');
        }
        else {
            return;
        }
        this.addToContent(cm);
        this.intersectWithRest(cm);
        this.constructedMobjects.push(cm);
        p1.update({ strokeColor: mob.penStrokeColor, fillColor: mob.penFillColor });
        p2.update({ strokeColor: mob.penStrokeColor, fillColor: mob.penFillColor });
    }
    intersectWithRest(conMob1) {
        for (let conMob2 of this.constructedMobjects) {
            if (conMob1 == conMob2) {
                continue;
            }
            let nbPoints = (conMob1 instanceof ConStrait && conMob2 instanceof ConStrait) ? 1 : 2;
            for (let i = 0; i < nbPoints; i++) {
                let p = new IntersectionPoint({
                    conMob1: conMob1,
                    conMob2: conMob2,
                    index: i
                });
                let isNewPoint = this.addPoint(p);
                //if (isNewPoint) {
                conMob1.addDependent(p);
                conMob2.addDependent(p);
                //}
            }
        }
    }
    onPointerDown(e) {
        if (this.creationMode != 'freehand') {
            super.onPointerDown(e);
            return;
        }
        if (this.contracted) {
            return;
        }
        let v = this.sensor.localEventVertex(e);
        let p = this.snappedPointForVertex(v);
        if (p !== null) {
            getPaper().sensor.eventTarget = p;
            p.startDragging(e);
        }
        else {
            this.startCreating(e);
        }
    }
}
//# sourceMappingURL=Construction.js.map