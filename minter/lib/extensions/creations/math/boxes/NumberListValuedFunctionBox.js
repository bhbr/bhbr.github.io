import { NumberListBox } from './NumberListBox.js';
import { Rectangle } from '../../../../core/shapes/Rectangle.js';
import { TextLabel } from '../../../../core/ui/TextLabel.js';
import { Color } from '../../../../core/classes/Color.js';
export class NumberListValuedFunctionBox extends NumberListBox {
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
                { name: 'argument', displayName: null, type: 'any' }
            ],
            outputProperties: [
                { name: 'value', displayName: null, type: 'Array<number>' }
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
        return [];
    }
    get list() {
        return this.result();
    }
    set list(newValue) {
        throw `Readonly property`;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        super.update({ value: this.result() }, redraw);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=NumberListValuedFunctionBox.js.map