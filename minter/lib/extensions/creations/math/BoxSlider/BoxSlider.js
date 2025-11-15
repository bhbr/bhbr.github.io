import { Linkable } from '../../../../core/linkables/Linkable.js';
import { vertexSubtract } from '../../../../core/functions/vertex.js';
import { getPaper } from '../../../../core/functions/getters.js';
import { Color } from '../../../../core/classes/Color.js';
import { TextLabel } from '../../../../core/mobjects/TextLabel.js';
import { eventVertex, ScreenEventHandler } from '../../../../core/mobjects/screen_events.js';
import { Rectangle } from '../../../../core/shapes/Rectangle.js';
import { SimpleNumberBox } from '../../../../extensions/creations/math/boxes/SimpleNumberBox.js';
export class BoxSlider extends Linkable {
    defaults() {
        return {
            inputProperties: [],
            outputProperties: [
                { name: 'value', type: 'number' }
            ],
            outerBar: new Rectangle({
                fillColor: Color.black(),
                fillOpacity: 1,
                strokeColor: Color.white()
            }),
            filledBar: new Rectangle({
                fillOpacity: 0.5
            }),
            label: new TextLabel({
                frameHeight: 25,
                horizontalAlign: 'center',
                verticalAlign: 'center',
                fontSize: 20
            }),
            min: 0,
            max: 1,
            value: 0.6,
            height: 200,
            width: 70,
            strokeColor: Color.white(),
            fillColor: Color.black(),
            barFillColor: Color.gray(0.5),
            screenEventHandler: ScreenEventHandler.Self,
            precision: 3,
            minValueInputBox: new SimpleNumberBox({
                anchor: [10, 10],
                value: 0
            }),
            maxValueInputBox: new SimpleNumberBox({
                anchor: [10, -30],
                value: 1
            })
        };
    }
    mutabilities() {
        return {
            inputProperties: 'never',
            outputNames: 'never',
            outerBar: 'never',
            filledBar: 'never',
            label: 'never'
        };
    }
    setup() {
        super.setup();
        this.add(this.outerBar);
        this.add(this.filledBar);
        this.add(this.label);
        this.addDependency('width', this.outerBar, 'width');
        this.addDependency('height', this.outerBar, 'height');
        this.update({
            frameWidth: this.width,
            frameHeight: this.height
        });
        this.add(this.minValueInputBox);
        this.add(this.maxValueInputBox);
        this.minValueInputBox.inputElement.value = this.min.toString();
        this.maxValueInputBox.inputElement.value = this.max.toString();
        this.minValueInputBox.blur = this.endMinValueEditing.bind(this);
        this.minValueInputBox.onReturn = this.endMinValueEditing.bind(this);
        this.maxValueInputBox.blur = this.endMaxValueEditing.bind(this);
        this.maxValueInputBox.onReturn = this.endMaxValueEditing.bind(this);
        this.updateDependents();
        this.outputList.update();
        this.moveToTop(this.outputList);
    }
    endMinValueEditing() {
        getPaper().blurFocusedChild();
        this.minValueInputBox.inputElement.blur();
        document.removeEventListener('keydown', this.minValueInputBox.boundKeyPressed);
        this.updateMinValue();
    }
    endMaxValueEditing() {
        getPaper().blurFocusedChild();
        this.maxValueInputBox.inputElement.blur();
        document.removeEventListener('keydown', this.maxValueInputBox.boundKeyPressed);
        this.updateMaxValue();
    }
    updateMinValue() {
        let minValue = Number(this.minValueInputBox.value);
        if (minValue >= this.max) {
            this.minValueInputBox.value = this.min;
        }
        else {
            this.update({
                min: minValue
            }, true);
        }
    }
    updateMaxValue() {
        let maxValue = Number(this.maxValueInputBox.value);
        if (maxValue <= this.min) {
            this.maxValueInputBox.value = this.max;
        }
        else {
            this.update({
                max: maxValue
            }, true);
        }
    }
    normalizedValue() {
        // is always between 0 and 1
        return (this.value - this.min) / (this.max - this.min);
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        if (args['width'] !== undefined) {
            this.view.frame.width = this.width;
        }
        if (args['height'] !== undefined) {
            this.view.frame.height = this.height;
            this.minValueInputBox.update({
                anchor: [10, this.height + 10]
            });
        }
        //// updating submobs
        let a = this.normalizedValue();
        if (isNaN(a)) {
            return;
        }
        this.filledBar.update({
            width: this.width,
            height: a * this.height,
            anchor: [0, this.height - a * this.height]
        }, redraw);
        this.updateLabel(redraw);
        this.updateDependents();
        if (redraw) {
            this.view.redraw();
        }
    }
    updateLabel(redraw = true) {
        this.label.update({
            text: this.value.toString(),
            anchor: [this.width / 2 - this.width / 2, this.height / 2 - 25 / 2],
            frameWidth: this.width
        }, redraw);
    }
    onPointerDown(e) {
        this.scrubStartingPoint = eventVertex(e);
        this.valueBeforeScrubbing = this.value;
    }
    onPointerMove(e) {
        let scrubVector = vertexSubtract(eventVertex(e), this.scrubStartingPoint);
        var newValue = this.valueBeforeScrubbing - scrubVector[1] / this.height * (this.max - this.min);
        newValue = Math.max(Math.min(newValue, this.max), this.min);
        newValue = Math.round(newValue * 10 ** this.precision) / 10 ** this.precision;
        this.update({ value: newValue });
    }
}
//# sourceMappingURL=BoxSlider.js.map