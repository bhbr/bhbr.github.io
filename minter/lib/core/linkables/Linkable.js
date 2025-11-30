import { Mobject } from '../../core/mobjects/Mobject.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { InputList } from './InputList.js';
import { OutputList } from './OutputList.js';
import { SimpleButton } from '../../core/mobjects/SimpleButton.js';
import { Checkbox } from '../../core/mobjects/Checkbox.js';
export class Linkable extends Mobject {
    defaults() {
        return {
            inputList: new InputList(),
            outputList: new OutputList(),
            inputProperties: [],
            outputProperties: [],
            linksEditable: false,
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    mutabilities() {
        return {
            inputList: 'never',
            outputList: 'never',
            linksEditable: 'in_subclass'
        };
    }
    get board() {
        let p = super.parent;
        if (p) {
            let pp = p.parent;
            if (pp) {
                return pp;
            }
        }
        return null;
    }
    set board(newValue) {
        super.parent = newValue.content;
    }
    setup() {
        super.setup();
        this.inputList.update({
            mobject: this,
            outletProperties: this.inputProperties,
            editable: this.linksEditable
        });
        this.add(this.inputList);
        this.inputList.view.hide();
        this.outputList.update({
            mobject: this,
            outletProperties: this.outputProperties,
            editable: this.linksEditable
        });
        this.add(this.outputList);
        this.outputList.view.hide();
    }
    showLinks() {
        if (this.inputList.height != 0) {
            this.inputList.view.show();
        }
        if (this.outputList.height != 0) {
            this.outputList.view.show();
        }
        this.disable();
    }
    hideLinks() {
        this.inputList.view.hide();
        this.outputList.view.hide();
        this.enable();
    }
    inputHooks() {
        // the hooks (with name and position) of available input variables
        let arr = [];
        for (let ip of this.inputProperties) {
            arr.push(this.inputList.hookNamed(ip.name));
        }
        return arr;
    }
    outputHooks() {
        // the hooks (with name and position) of available output variables
        let arr = [];
        for (let op of this.outputProperties) {
            arr.push(this.outputList.hookNamed(op.name));
        }
        return arr;
    }
    renameLinkableProperty(kind, oldName, newName) {
        let list = (kind == 'input') ? this.inputList : this.outputList;
        list.renameProperty(oldName, newName);
        // TODO: update dependencies
    }
    // The following two methods are used only for positioning IOLists, rework/rename this
    getCompactWidth() {
        return this.view.frame.width;
    }
    getCompactHeight() {
        return this.view.frame.height;
    }
    dragging(e) {
        // so we can drag while showing the links
        // (doesn't work at present)
        super.dragging(e);
        this.board.updateLinks();
    }
    setControlsVisibility(visible) {
        for (let mob of this.submobs) {
            if (mob instanceof SimpleButton || mob instanceof Checkbox) {
                mob.update({
                    visible: visible
                });
            }
        }
    }
    allHooks() {
        return this.inputList.allHooks().concat(this.outputList.allHooks());
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['inputProperties'] !== undefined) {
            this.inputList.update({
                outletProperties: args['inputProperties']
            }, true);
        }
        if (args['outputProperties'] !== undefined) {
            this.outputList.update({
                outletProperties: args['outputProperties']
            }, true);
        }
    }
    addedInputLink(link) {
        link.startHook.outlet.ioList.mobject.updateDependents();
    }
    addedOutputLink(link) {
        this.update();
        this.updateDependents();
    }
    removedInputLink(link) {
        this.update();
    }
    removedOutputLink(link) {
        this.update();
        if (!link.startHook || !link.endHook) {
            return;
        }
        link.startHook.outlet.removeUnlinkedHook();
    }
    inputNames() {
        return this.inputProperties.map((prop) => prop.name);
    }
    outputNames() {
        return this.outputProperties.map((prop) => prop.name);
    }
    positionIOLists() {
        this.inputList.positionOutlets();
        this.outputList.positionOutlets();
        this.inputList.positionSelf();
        this.outputList.positionSelf();
    }
}
//# sourceMappingURL=Linkable.js.map