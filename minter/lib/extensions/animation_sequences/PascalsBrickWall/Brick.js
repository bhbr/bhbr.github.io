import { Rectangle } from '../../../core/shapes/Rectangle.js';
import { HEADS_COLOR, TAILS_COLOR, BASE_ROW_LENGTH, BRICK_STROKE_WIDTH, BRICK_FILL_OPACITY } from './constants.js';
import { Color } from '../../../core/classes/Color.js';
import { binomial } from '../../../core/functions/math.js';
import { Circle } from '../../../core/shapes/Circle.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
export class Brick extends Rectangle {
    defaults() {
        return {
            nbFlips: 1,
            nbTails: 0,
            tailsProbability: 0.5,
            fillOpacity: BRICK_FILL_OPACITY,
            strokeWidth: BRICK_STROKE_WIDTH,
            anchorMarker: new Circle({
                fillColor: Color.green(),
                fillOpacity: 1,
                radius: 5
            }),
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    get length() {
        return this.width;
    }
    set length(newValue) {
        this.width = newValue;
    }
    get transformAngle() {
        return this.transform.angle;
    }
    set transformAngle(newValue) {
        this.transform.angle = newValue;
    }
    setup() {
        super.setup();
        this.anchorMarker.update({
            midpoint: [0, 0]
        });
        //this.add(this.anchorMarker)
        // this.label.update({
        // 	nbHeads: this.nbHeads(),
        // 	nbTails: this.nbTails,
        // 	anchor: [this.width / 2 - this.label.width / 2, this.height / 2 - this.label.frameHeight / 2]
        // })
        // this.add(this.label)
        // this.label.view.hide()
    }
    nbHeads() {
        return this.nbFlips - this.nbTails;
    }
    headsProbability() {
        return 1 - this.tailsProbability;
    }
    leftPartColor() {
        return HEADS_COLOR.interpolate(TAILS_COLOR, this.nbTails / (this.nbFlips + 1));
    }
    rightPartColor() {
        return HEADS_COLOR.interpolate(TAILS_COLOR, (this.nbTails + 1) / (this.nbFlips + 1));
    }
    rightPartAnchor() {
        return [this.leftPartWidth(), 0];
    }
    leftPartWidth() {
        return this.headsProbability() * this.width;
    }
    rightPartWidth() {
        return this.tailsProbability * this.width;
    }
    leftPartWidthAfterMerge() {
        let N = this.nbFlips - 1;
        let T = this.nbTails;
        let H = N - T;
        return binomial(N, T) * this.tailsProbability ** T * this.headsProbability() ** H * BASE_ROW_LENGTH * this.headsProbability();
    }
    rightPartWidthAfterMerge() {
        let N = this.nbFlips - 1;
        let T = this.nbTails;
        let H = N - T;
        return binomial(N, H) * this.tailsProbability ** T * this.headsProbability() ** H * BASE_ROW_LENGTH * this.tailsProbability;
    }
    makeLeftPart() {
        let rect = new Rectangle({
            transform: this.transform.copy(),
            height: this.height,
            width: this.leftPartWidth(),
            fillColor: this.getFillColor(),
            fillOpacity: BRICK_FILL_OPACITY,
            strokeWidth: BRICK_STROKE_WIDTH
        });
        this.addDependency('leftPartWidth', rect, 'width');
        return rect;
    }
    makeRightPart() {
        let rect = new Rectangle({
            transform: this.transform.copy(),
            height: this.height,
            width: this.rightPartWidth(),
            fillColor: this.getFillColor(),
            fillOpacity: BRICK_FILL_OPACITY,
            strokeWidth: BRICK_STROKE_WIDTH
        });
        this.addDependency('rightPartWidth', rect, 'width');
        return rect;
    }
    getFillColor() {
        return HEADS_COLOR.interpolate(TAILS_COLOR, this.nbTails / this.nbFlips);
    }
    combinations() {
        return binomial(this.nbFlips, this.nbTails);
    }
    probability() {
        return this.combinations() * this.tailsProbability ** this.nbTails * this.headsProbability() ** this.nbHeads();
    }
    getWidth() {
        return this.probability() * BASE_ROW_LENGTH;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        args['fillColor'] = args['fillColor'] ?? this.getFillColor();
        args['width'] = this.getWidth();
        super.update(args, redraw);
        this.updateDependents();
    }
    onTap(e) {
        this.labelShower.toggleLabelOnBrick(this);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Brick.js.map