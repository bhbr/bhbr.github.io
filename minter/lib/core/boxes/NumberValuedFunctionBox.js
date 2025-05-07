import { NumberBox } from './NumberBox.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { Color } from '../../core/classes/Color.js';
export class NumberValuedFunctionBox extends NumberBox {
    defaults() {
        return {
            name: 'f',
            argument: null,
            functionSign: new Rectangle({
                width: 50,
                height: 20,
                fillColor: Color.black(),
                fillOpacity: 1.0
            }),
            functionLabel: new TextLabel(),
            inputProperties: [
                { name: 'argument', displayName: 'list', type: 'Array<number>' }
            ],
            outputProperties: [
                { name: 'value', displayName: null, type: 'number' }
            ]
        };
    }
    setup() {
        super.setup();
        this.functionSign.update({
            anchor: [this.frameWidth / 2 - this.functionSign.frameWidth / 2, -this.functionSign.frameHeight]
        });
        this.functionLabel.update({
            text: this.name,
            fontSize: 12,
            frameWidth: this.functionSign.width,
            frameHeight: this.functionSign.height
        });
        this.functionSign.add(this.functionLabel);
        this.add(this.functionSign);
    }
    result() {
        return NaN;
    }
    update(args = {}, redraw = true) {
        args['value'] = this.result();
        super.update(args, redraw);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=NumberValuedFunctionBox.js.map