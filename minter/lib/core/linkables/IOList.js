import { vertexOrigin } from '../../core/functions/vertex.js';
import { Color } from '../../core/classes/Color.js';
import { RoundedRectangle } from '../../core/shapes/RoundedRectangle.js';
import { LinkOutlet } from './LinkOutlet.js';
import { IO_LIST_WIDTH, HOOK_INSET_X, HOOK_INSET_Y, HOOK_VERTICAL_SPACING } from './constants.js';
import { remove } from '../../core/functions/arrays.js';
export class IOList extends RoundedRectangle {
    defaults() {
        return {
            linkOutlets: [],
            mobject: null,
            outletProperties: [],
            cornerRadius: 20,
            width: IO_LIST_WIDTH,
            frameWidth: IO_LIST_WIDTH,
            fillColor: Color.gray(0.2),
            fillOpacity: 1.0,
            strokeColor: Color.gray(0.4),
            strokeWidth: 0.75,
            editable: false
        };
    }
    mutabilities() {
        return {
            cornerRadius: 'never',
            fillColor: 'never',
            fillOpacity: 'never',
            strokeWidth: 'never',
            kind: 'in_subclass',
            editable: 'on_update'
        };
    }
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    setup() {
        super.setup();
        this.updateOutlets();
        this.update({ height: this.getHeight() });
    }
    getHeight() {
        // calculate the height from the number of outputs
        if (this.outletProperties == undefined) {
            return 0;
        }
        if (this.outletProperties.length == 0) {
            return 0;
        }
        else {
            return 2 * HOOK_INSET_Y + HOOK_VERTICAL_SPACING * this.outletProperties.length;
        }
    }
    updateOutlets() {
        // create the hooks (empty circles) and their labels
        for (var i = 0; i < this.outletProperties.length; i++) {
            let prop = this.outletProperties[i];
            if (!this.outletNamed(prop.name)) {
                this.createOutlet(prop);
            }
        }
        for (let outlet of this.linkOutlets) {
            var found = false;
            for (let prop of this.outletProperties) {
                if (outlet.name == prop['name']) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                this.removeOutlet(outlet);
            }
            for (let hook of outlet.linkHooks) {
                hook.updateDependents();
            }
        }
    }
    createOutlet(prop) {
        let outlet = new LinkOutlet({
            name: prop.name,
            displayName: prop.displayName ?? prop.name,
            editable: this.editable,
            ioList: this,
            type: prop.type
        });
        this.add(outlet);
        this.linkOutlets.push(outlet);
        this.positionOutlet(outlet, this.linkOutlets.length - 1);
    }
    removeOutlet(outlet) {
        for (let hook of outlet.linkHooks) {
            if (hook.linked) {
                this.mobject.board.removeDependencyAtHook(hook);
            }
        }
        this.remove(outlet);
        remove(this.linkOutlets, outlet);
    }
    positionOutlet(outlet, index) {
        outlet.update({
            anchor: [HOOK_INSET_X, HOOK_INSET_Y + HOOK_VERTICAL_SPACING * index]
        });
        for (let hook of outlet.linkHooks) {
            hook.updateDependents();
        }
    }
    hookNamed(name, index = 0) {
        let outlet = this.outletNamed(name);
        if (outlet === null) {
            return null;
        }
        let hooks = outlet.linkHooks;
        if (hooks.length <= index) {
            return null;
        }
        return hooks[index];
    }
    outletNamed(name) {
        for (let outlet of this.linkOutlets) {
            if (outlet.name == name) {
                return outlet;
            }
        }
        return null;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        this.height = this.getHeight();
        if (this.height == 0) {
            this.view.hide();
        }
        else {
            this.view.show();
        }
        if (this.mobject == null) {
            return;
        }
        if (this.constructor.name == 'ExpandedBoardInputList') {
            return;
        }
        if (args['outletProperties'] === undefined) {
            return;
        }
        this.updateOutlets();
        if (this.mobject == null) {
            return;
        }
        if (this.mobject.board) {
            this.mobject.board.updateLinks();
        }
        this.positionSelf();
        if (redraw) {
            this.redraw();
        }
    }
    positionSelf() {
        super.update({
            anchor: this.getAnchor()
        }, true);
    }
    getAnchor() {
        // placeholder, subclassed in InputList and OutputList
        return vertexOrigin();
    }
    outletNames() {
        return this.outletProperties.map((prop) => prop.name);
    }
    renameProperty(oldName, newName) {
        let index = this.outletNames().indexOf(oldName);
        this.outletProperties[index].name = newName;
        this.linkOutlets[index].update({
            name: newName
        });
    }
    allHooks() {
        let ret = [];
        for (let outlet of this.linkOutlets) {
            ret = ret.concat(outlet.linkHooks);
        }
        return ret;
    }
}
//# sourceMappingURL=IOList.js.map