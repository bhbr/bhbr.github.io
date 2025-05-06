import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { InputTextBox } from '../../core/mobjects/InputTextBox.js';
import { LinkHook } from './LinkHook.js';
import { MGroup } from '../../core/mobjects/MGroup.js';
import { HOOK_HORIZONTAL_SPACING, IO_LIST_WIDTH } from './constants.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class LinkOutlet extends MGroup {
    defaults() {
        return {
            name: '',
            displayName: '',
            type: 'number',
            label: new TextLabel({
                frameWidth: IO_LIST_WIDTH / 2,
                frameHeight: 25
            }),
            inputBox: null,
            linkHooks: [],
            editable: false,
            ioList: null
        };
    }
    mutabilities() {
        return {
            label: 'never',
            inputBox: 'on_update',
            linkHooks: 'never',
            editable: 'on_init',
            ioList: 'on_init',
            type: 'on_init'
        };
    }
    setup() {
        super.setup();
        this.displayName = this.displayName ?? this.name;
        this.label.update({
            text: this.displayName
        });
        this.label.view.update({
            horizontalAlign: 'right'
        });
        this.add(this.label);
        if (this.editable) {
            this.label.update({
                screenEventHandler: ScreenEventHandler.Self
            });
            this.label.onTap = function (e) {
                this.editLabel();
            }.bind(this);
            this.update({
                inputBox: new InputTextBox({
                    value: this.displayName,
                    frameWidth: this.label.frameWidth,
                    frameHeight: this.label.frameHeight
                })
            });
            this.inputBox.onReturn = function () {
                this.updateLabel();
            }.bind(this);
        }
        this.addHook();
    }
    addHook() {
        let index = this.linkHooks.length;
        let newHook = new LinkHook({
            midpoint: [
                this.ioList.frameWidth / 2 + 15 + HOOK_HORIZONTAL_SPACING * index,
                this.label.frameHeight / 2
            ],
            outlet: this
        });
        this.add(newHook);
        this.linkHooks.push(newHook);
    }
    get kind() {
        return this.ioList.kind;
    }
    removeHook() {
        let lastHook = this.linkHooks.pop();
        this.remove(lastHook);
    }
    editLabel() {
        this.remove(this.label);
        this.add(this.inputBox);
        this.inputBox.focus();
    }
    updateLabel() {
        this.remove(this.inputBox);
        this.add(this.label);
        this.update({
            displayName: this.inputBox.value
        });
    }
    update(args = {}, redraw = true) {
        let newName = args['displayName'];
        if (newName == '') {
            throw `Name of property ${this.displayName} cannot be changed to an empty string`;
        }
        super.update(args, redraw);
        if (newName !== undefined) {
            this.label.update({
                text: newName
            }, redraw);
            if (this.editable) {
                this.inputBox.update({
                    value: newName
                }, redraw);
            }
        }
    }
}
//# sourceMappingURL=LinkOutlet.js.map