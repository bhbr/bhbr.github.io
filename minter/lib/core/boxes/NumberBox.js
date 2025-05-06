import { Linkable } from '../../core/linkables/Linkable.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
import { Color } from '../../core/classes/Color.js';
import { DraggingCreator } from '../../core/creators/DraggingCreator.js';
export class NumberBox extends Linkable {
    defaults() {
        return {
            value: 1,
            valueLabel: new TextLabel(),
            background: new Rectangle({
                fillColor: Color.black(),
                fillOpacity: 1
            }),
            frameWidth: 80,
            frameHeight: 40
        };
    }
    setup() {
        super.setup();
        this.background.update({
            width: this.view.frame.width,
            height: this.view.frame.height
        });
        this.add(this.background);
        this.valueLabel.update({
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height,
            text: `${this.value}`
        });
        this.valueLabel.view.div.style.fontSize = '20px';
        this.add(this.valueLabel);
    }
    valueAsString() {
        if (!this.value) {
            return '';
        }
        var text = this.value.toString();
        if (!Number.isInteger(this.value)) {
            text = `${this.value.toPrecision(3)}`;
        }
        if (isNaN(this.value) || !isFinite(this.value)) {
            text = '';
        }
        return text;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        var labelText = this.valueAsString();
        this.valueLabel.update({
            width: this.view.frame.width,
            height: this.view.frame.height,
            text: labelText
        }, redraw);
        if (redraw) {
            this.view.redraw();
        }
    }
    mutabilities() { return {}; }
}
export class LinkableNumberBox extends NumberBox {
    defaults() {
        return {
            inputProperties: [
                { name: 'value', displayName: null, type: 'number' }
            ],
            outputProperties: [
                { name: 'value', displayName: null, type: 'number' }
            ]
        };
    }
    mutabilities() { return {}; }
}
export class NumberBoxCreator extends DraggingCreator {
    createMobject() {
        return new LinkableNumberBox({
            anchor: this.getStartPoint()
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        this.creation.hideLinks();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=NumberBox.js.map