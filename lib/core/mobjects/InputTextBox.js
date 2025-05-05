import { Rectangle } from '../../core/shapes/Rectangle.js';
import { Color } from '../../core/classes/Color.js';
import { getPaper, getSidebar } from '../../core/functions/getters.js';
import { ScreenEventHandler, isTouchDevice } from '../../core/mobjects/screen_events.js';
import { Mobject } from './Mobject.js';
export class InputTextBox extends Mobject {
    defaults() {
        return {
            background: new Rectangle({
                fillColor: Color.black()
            }),
            inputElement: document.createElement('input'),
            frameWidth: 80,
            frameHeight: 40,
            strokeWidth: 0.0,
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    mutabilities() {
        return {
            background: 'never',
            inputElement: 'never'
        };
    }
    onPointerUp(e) {
        this.focus();
    }
    get value() {
        return this.inputElement.value;
    }
    set value(newValue) {
        this.inputElement.value = newValue;
    }
    focus() {
        super.focus();
        this.inputElement.focus();
        document.addEventListener('keydown', this.boundKeyPressed);
    }
    blur() {
        super.blur();
        this.inputElement.blur();
        document.removeEventListener('keydown', this.boundKeyPressed);
    }
    setup() {
        super.setup();
        this.add(this.background);
        this.inputElement.setAttribute('type', 'text');
        this.inputElement.style.width = '80%';
        this.inputElement.style.padding = '3px 3px';
        this.inputElement.style.color = 'white';
        this.inputElement.style.backgroundColor = 'black';
        this.inputElement.style.textAlign = 'left';
        this.inputElement.style.verticalAlign = 'center';
        this.inputElement.style.fontSize = '16px';
        this.inputElement.value = this.value;
        this.view.div.appendChild(this.inputElement);
        this.boundKeyPressed = this.keyPressed.bind(this);
        document.addEventListener('keyup', this.boundActivateKeyboard);
    }
    boundKeyPressed(e) { }
    keyPressed(e) {
        if (e.which != 13) {
            return;
        }
        this.inputElement.blur();
        getPaper().activeKeyboard = true;
        if (!isTouchDevice) {
            for (let button of getSidebar().buttons) {
                button.activeKeyboard = true;
            }
        }
        this.update({ value: this.valueFromString(this.inputElement.value) });
        this.onReturn();
    }
    valueFromString(valueString) {
        return valueString;
    }
    activateKeyboard() {
        document.removeEventListener('keyup', this.boundActivateKeyboard);
        document.addEventListener('keydown', this.boundKeyPressed);
        getPaper().activeKeyboard = false;
        for (let button of getSidebar().buttons) {
            button.activeKeyboard = false;
        }
    }
    boundActivateKeyboard() { }
    deactivateKeyboard() {
        document.removeEventListener('keydown', this.boundKeyPressed);
        getPaper().activeKeyboard = true;
        for (let button of getSidebar().buttons) {
            button.activeKeyboard = true;
        }
    }
    onReturn() { }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        this.background.update({
            width: this.view.frame.width,
            height: this.view.frame.height
        }, redraw);
    }
}
//# sourceMappingURL=InputTextBox.js.map