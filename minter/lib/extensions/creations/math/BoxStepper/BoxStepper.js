import { BoxSlider } from '../../../../extensions/creations/math/BoxSlider/BoxSlider.js';
import { MGroup } from '../../../../core/mobjects/MGroup.js';
import { Line } from '../../../../core/shapes/Line.js';
import { log } from '../../../../core/functions/logging.js';
export class BoxStepper extends BoxSlider {
    defaults() {
        return {
            min: 0,
            max: 10,
            value: 6,
            precision: 0,
            ticks: new MGroup()
        };
    }
    mutabilities() {
        return {
            precision: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.ticks);
        this.createTicks();
    }
    createTicks() {
        let N = this.max - this.min;
        let dy = this.height / N;
        for (let i = 1; i < N; i++) {
            let tick = new Line({
                anchor: [0, i * dy],
                endPoint: [8, 0],
                frameWidth: 8,
                frameHeight: 1
            });
            this.ticks.add(tick);
        }
    }
    update(args = {}, redraw = true) {
        log(args);
        super.update(args, redraw);
        if (args['min'] !== undefined || args['max'] !== undefined) {
            this.ticks.removeAllChildren();
            this.createTicks();
        }
        if (args['height'] !== undefined) {
            let N = this.max - this.min;
            let dy = this.height / N;
            for (let i = 1; i < N; i++) {
                this.ticks.children[i - 1].update({
                    anchor: [0, i * dy]
                });
            }
        }
    }
}
//# sourceMappingURL=BoxStepper.js.map