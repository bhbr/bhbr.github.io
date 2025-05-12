import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { MGroup } from '../../core/mobjects/MGroup.js';
import { Square } from '../../core/shapes/Square.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class Checkbox extends MGroup {
    defaults() {
        return {
            state: true,
            screenEventHandler: ScreenEventHandler.Self,
            frameWidth: 100,
            frameHeight: 20,
            visible: false,
            boxBorder: new Square({
                sidelength: 18
            }),
            box: new TextLabel({
                frameWidth: 18,
                frameHeight: 18,
                text: '&#10004;'
            }),
            label: new TextLabel({
                frameWidth: 100,
                frameHeight: 20,
                anchor: [30, 0]
            })
        };
    }
    get text() {
        return this.label.text;
    }
    set text(newValue) {
        this.label.update({
            text: newValue
        });
    }
    setup() {
        super.setup();
        this.add(this.boxBorder);
        this.add(this.box);
        this.add(this.label);
        this.label.view.div.style.justifyContent = 'left';
        if (this.state) {
            this.box.view.show();
        }
        else {
            this.box.view.hide();
        }
    }
    check() {
        this.state = true;
        this.box.view.show();
    }
    uncheck() {
        this.state = false;
        this.box.view.hide();
    }
    toggle() {
        if (this.state) {
            this.uncheck();
        }
        else {
            this.check();
        }
        this.onToggle(this.state);
    }
    onToggle(flag) { }
    onTap(e) {
        this.toggle();
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Checkbox.js.map