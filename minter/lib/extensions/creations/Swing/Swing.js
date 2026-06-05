import { vertexAdd, vertexCentrallyRotatedBy, vertexCentrallyScaledBy } from '../../../core/functions/vertex.js';
import { Color } from '../../../core/classes/Color.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { Line } from '../../../core/shapes/Line.js';
import { Rectangle } from '../../../core/shapes/Rectangle.js';
import { Circle } from '../../../core/shapes/Circle.js';
export class Swing extends Linkable {
    defaults() {
        return {
            fixtureWidth: 50,
            fixtureHeight: 20,
            fixture: new Rectangle({
                fillColor: Color.white(),
                fillOpacity: 1
            }),
            string: new Line(),
            weight: new Circle({
                fillColor: Color.white(),
                fillOpacity: 1
            }),
            maxLength: 300,
            length: 1,
            mass: 0.2,
            initialAngle: 0,
            initialSpeed: 0,
            initialTime: Date.now(),
            inputProperties: [
                { name: 'length', displayName: null, type: 'number' },
                { name: 'mass', displayName: null, type: 'number' }
            ],
            outputProperties: [
                { name: 'angle', displayName: null, type: 'number' },
                { name: 'period', displayName: null, type: 'number' }
            ],
        };
    }
    mutabilities() {
        return {
            fixtureWidth: 'never',
            fixtureHeight: 'never',
            fixture: 'never',
            string: 'never',
            weight: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.fixture);
        this.add(this.string);
        this.add(this.weight);
        this.fixture.update({
            width: this.fixtureWidth,
            height: this.fixtureHeight,
            anchor: [(this.view.frame.width - this.fixtureWidth) / 2, 0]
        }, true);
        this.string.update({
            startPoint: [this.view.frame.width / 2, this.fixtureHeight]
        });
        this.weight.update({
            radius: this.weightRadius()
        });
        this.view.frame.height = this.fixtureHeight + this.pixelLength() + this.weightRadius();
        this.outputList.update();
    }
    angle() {
        let dt = (Date.now() - this.initialTime) % this.period();
        let value = this.initialAngle * Math.cos(2 * Math.PI * dt / this.period());
        return value;
    }
    period() {
        return 500 * this.length ** 0.5 * 5; // ms
    }
    pixelLength() {
        return this.length * this.maxLength;
    }
    weightRadius() {
        return 50 * this.mass ** 0.5;
    }
    update(args = {}, redraw = true) {
        args['frameHeight'] = this.fixtureHeight + this.pixelLength() + this.weightRadius();
        if (args['frameHeight'] !== undefined) {
            this.outputList.update();
        }
        super.update(args, false);
        let angle = args['initialAngle'] ?? this.angle();
        let newEndPoint = vertexAdd(vertexCentrallyScaledBy(vertexCentrallyRotatedBy([0, 1], -angle), this.pixelLength()), this.string.startPoint);
        this.string.update({
            endPoint: newEndPoint
        }, redraw);
        this.weight.update({
            radius: this.weightRadius(),
            midpoint: newEndPoint
        }, redraw);
        if (redraw) {
            this.view.redraw();
        }
    }
    run() {
        window.setInterval(function () { this.update(); }.bind(this), 10);
    }
}
//# sourceMappingURL=Swing.js.map