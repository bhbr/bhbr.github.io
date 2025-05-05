import { Circle } from '../../../core/shapes/Circle.js';
import { Color } from '../../../core/classes/Color.js';
import { TextLabel } from '../../../core/mobjects/TextLabel.js';
export class Coin extends Circle {
    defaults() {
        return {
            state: 'heads',
            radius: 25,
            headsColor: new Color(0, 0.3, 1),
            tailsColor: Color.red(),
            tailsProbability: 0.5,
            label: new TextLabel({
                fontSize: 24,
                text: 'H'
            })
        };
    }
    setup() {
        super.setup();
        this.label.update({
            //anchor: [0, 0],
            frameWidth: 2 * this.radius,
            frameHeight: 2 * this.radius
        });
        this.add(this.label);
    }
    get value() { return (this.state == 'tails') ? 1 : 0; }
    set value(newValue) { this.state = (newValue == 0) ? 'heads' : 'tails'; }
    synchronizeUpdateArguments(args = {}) {
        args = super.synchronizeUpdateArguments(args);
        let newState = args['state'];
        if (newState === undefined) {
            return args;
        }
        let hc = args['headsColor'] ?? this.headsColor;
        let tc = args['tailsColor'] ?? this.tailsColor;
        args['fillColor'] = (newState === 'heads') ? hc : tc;
        args['labelText'] = (newState === 'heads') ? 'H' : 'T';
        return args;
    }
    flip() {
        let x = Math.random();
        let newState = (x < this.tailsProbability) ? 'tails' : 'heads';
        this.update({ state: newState });
    }
    get labelText() {
        return this.label.text;
    }
    set labelText(newValue) {
        this.label.update({ text: newValue });
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Coin.js.map