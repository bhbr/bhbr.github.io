import { vertexOrigin } from '../../core/functions/vertex.js';
import { Color } from '../../core/classes/Color.js';
import { RoundedRectangle } from '../../core/shapes/RoundedRectangle.js';
import { LinkOutlet } from './LinkOutlet.js';
import { IO_LIST_WIDTH, HOOK_INSET_X, HOOK_INSET_Y, HOOK_VERTICAL_SPACING } from './constants.js';
import { clear } from '../../core/functions/arrays.js';
export class IOList extends RoundedRectangle {
    defaults() {
        return {
            linkOutlets: [],
            mobject: null,
            outletProperties: [],
            cornerRadius: 20,
            width: IO_LIST_WIDTH,
            fillColor: Color.gray(0.2),
            fillOpacity: 1.0,
            strokeWidth: 0,
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
        this.createOutlets();
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
    createOutlets() {
        // create the hooks (empty circles) and their labels
        for (let outlet of this.linkOutlets) {
            this.remove(outlet);
        }
        clear(this.linkOutlets);
        for (var i = 0; i < this.outletProperties.length; i++) {
            let prop = this.outletProperties[i];
            this.createOutlet(prop);
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
    positionOutlet(outlet, index) {
        outlet.update({
            anchor: [HOOK_INSET_X, HOOK_INSET_Y + HOOK_VERTICAL_SPACING * index]
        });
    }
    hookNamed(name, index = 0) {
        for (let outlet of this.linkOutlets) {
            if (outlet.name == name) {
                return outlet.linkHooks[index];
            }
        }
        return null;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        if (this.mobject == null) {
            return;
        }
        if (this.constructor.name == 'ExpandedBoardInputList') {
            return;
        }
        if (args['outletProperties'] === undefined) {
            return;
        }
        this.createOutlets();
        this.height = this.getHeight();
        if (this.mobject == null) {
            return;
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