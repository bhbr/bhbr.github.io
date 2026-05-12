import { Mobject } from '../../core/mobjects/Mobject.js';
import { MGroup } from '../../core/mobjects/MGroup.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { InputList } from './InputList.js';
import { OutputList } from './OutputList.js';
import { remove } from '../../core/functions/arrays.js';
export class Linkable extends Mobject {
    defaults() {
        return {
            inputList: new InputList(),
            outputList: new OutputList(),
            inputProperties: [],
            outputProperties: [],
            linksEditable: false,
            screenEventHandler: ScreenEventHandler.Self,
            controls: new MGroup()
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
        this.controls.update({
            frameWidth: this.frameWidth,
            frameHeight: this.frameHeight
        });
        this.add(this.controls);
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
        //this.disable()
    }
    hideLinks() {
        this.inputList.view.hide();
        this.outputList.view.hide();
        //this.enable()
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
        this.controls.view.setVisibility(visible);
        // 	for (let mob of this.controls.children) {
        // 		mob.view.setVisibility(visible)
        // 	}
    }
    setLinksVisibility(visible) {
        if (visible) {
            this.showLinks();
        }
        else {
            this.hideLinks();
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
        link.startHook.outlet.ioList.mobject.updateDependents(true);
    }
    addedOutputLink(link) {
        this.update();
        this.updateDependents(true);
    }
    removedInputLink(link) {
        this.update();
    }
    removedOutputLink(link) {
        this.update();
        if (!link.startHook) {
            return;
        }
        //link.startHook.outlet.removeUnlinkedHook()
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
    isLinked(prop, kind) {
        let ioList = (kind == 'input') ? this.inputList : this.outputList;
        let outlet = ioList.outletNamed(prop);
        return outlet.linkHooks[0].linked;
    }
    linkedInputProperties() {
        return this.inputNames().filter((x) => this.isLinked(x, 'input'));
    }
    linkedOutputProperties() {
        return this.outputNames().filter((x) => this.isLinked(x, 'output'));
    }
    createInputVariable(name, value) {
        this.createProperty(name, value);
        this.inputProperties.push({
            name: name,
            type: 'number',
            displayName: name
        });
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.positionIOLists();
        this.inputList.view.hide();
    }
    removeInputVariable(name) {
        if (name == null) {
            return;
        }
        this.removeProperty(name);
        for (let prop of this.inputProperties) {
            if (prop['name'] == name) {
                remove(this.inputProperties, prop);
                break;
            }
        }
        this.inputList.update({
            outletProperties: this.inputProperties
        });
        this.positionIOLists();
        this.inputList.view.hide();
        this.update();
    }
    createOutputVariable(name) {
        if (name == null) {
            return;
        }
        this.createProperty(name, 0);
        this.outputProperties = [{
                name: name,
                type: 'number',
                displayName: name
            }];
        this.outputList.update({
            outletProperties: this.outputProperties // should not be necessary
        });
        this.positionIOLists();
        this.outputList.view.hide();
    }
    removeOutputVariable(name) {
        if (name == null) {
            return;
        }
        this.removeProperty(name);
        for (let prop of this.outputProperties) {
            if (prop['name'] == name) {
                remove(this.outputProperties, prop);
                break;
            }
        }
        this.outputList.update({
            outletProperties: this.outputProperties // should not be necessary
        });
        this.positionIOLists();
        this.outputList.view.hide();
    }
    addDependency(outputName, target, inputName, kind = 'value', refresh = true) {
        var newKind = 'value';
        if (target instanceof Linkable) {
            for (let prop of target.inputProperties) {
                if (prop['name'] == inputName) {
                    newKind = prop['kind'] ?? 'value';
                    break;
                }
            }
        }
        super.addDependency(outputName, target, inputName, newKind, refresh);
    }
}
//# sourceMappingURL=Linkable.js.map