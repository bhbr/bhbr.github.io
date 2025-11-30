import { remove, clear } from '../../core/functions/arrays.js';
import { copy } from '../../core/functions/copying.js';
import { ScreenEventHandler, eventVertex, addPointerDown, addPointerMove, addPointerUp, addPointerOut } from './screen_events.js';
import { vertexAdd, vertexSubtract } from '../../core/functions/vertex.js';
import { Transform } from '../../core/classes/Transform.js';
import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { Dependency } from './Dependency.js';
import { View } from './View.js';
import { Motor } from './Motor.js';
import { Sensor } from './Sensor.js';
import { getPaper } from '../../core/functions/getters.js';
import { UpdateCall, UpdateCalls } from './UpdateCall.js';
export class Mobject extends ExtendedObject {
    /*
    A mobject (math object) has a view with an underlying state and logic
    for drawing (View), animation (Motor) and user interaction (Sensor).
     */
    //////////////////////////////////////////////////////////
    //                                                      //
    //                    INITIALIZATION                    //
    //                                                      //
    //////////////////////////////////////////////////////////
    /*
    Subclasses dot NOT get their own explicit constructor.
    The state is completely set by fullDefaults().
    Any additional actions are performed afterwards in setup().
    
    Subclasses may also have quite a different setup
    than their superclass, and would otherwise have to undo
    a lot of the superclass's constructor setup.
    (E. g. a Circle's anchor should not be set, instead
    its midpoint should. A Circle's anchor acts like
    a computed property.)
    
    It also allows to control the setting of default
    state variables.
    */
    constructor(args = {}) {
        /*
        A mobject is initialized by providing a dictionary (object)
        of parameters (args).
        */
        super(args);
        this.setup();
        this.update();
        this.view.redraw();
    }
    defaults() {
        return {
            // hierarchy
            _parent: null,
            children: [], // i. e. submobjects
            view: new View(),
            motor: new Motor(),
            sensor: new Sensor(),
            preventDefault: true,
            draggingEnabled: false,
            // dependencies
            dependencies: []
        };
    }
    mutabilities() {
        return {
            view: 'on_init',
            children: 'never'
        };
    }
    setup() {
        this.view.mobject = this;
        this.view.setup();
        this.motor.mobject = this;
        this.sensor.mobject = this;
        // put into sensor setup?
        addPointerDown(this.view.div, this.sensor.capturedOnPointerDown.bind(this.sensor));
        addPointerMove(this.view.div, this.sensor.capturedOnPointerMove.bind(this.sensor));
        addPointerUp(this.view.div, this.sensor.capturedOnPointerUp.bind(this.sensor));
        addPointerOut(this.view.div, this.sensor.capturedOnPointerOut.bind(this.sensor));
    }
    //////////// Aliases ////////////
    get anchor() { return this.view?.anchor ?? [0, 0]; }
    set anchor(newValue) {
        if (!this.view) {
            return;
        }
        this.view.anchor = newValue;
    }
    get transform() { return this.view?.transform ?? Transform.identity(); }
    set transform(newValue) {
        if (!this.view) {
            return;
        }
        this.view.transform = newValue;
    }
    get frame() { return this.view.frame; }
    set frame(newValue) { this.view.frame = newValue; }
    get frameWidth() { return this.frame.width; }
    set frameWidth(newValue) { this.frame.width = newValue; }
    get frameHeight() { return this.frame.height ?? 0; }
    set frameHeight(newValue) { this.frame.height = newValue; }
    get visible() { return this.view.visible; }
    set visible(newValue) { this.view.visible = newValue; }
    get opacity() { return this.view.opacity; }
    set opacity(newValue) { this.view.opacity = newValue; }
    get backgroundColor() { return this.view.backgroundColor; }
    set backgroundColor(newValue) { this.view.backgroundColor = newValue; }
    get borderColor() { return this.view.borderColor; }
    set borderColor(newValue) { this.view.borderColor = newValue; }
    get borderWidth() { return this.view.borderWidth; }
    set borderWidth(newValue) { this.view.borderWidth = newValue; }
    get drawBorder() { return this.view.drawBorder; }
    set drawBorder(newValue) { this.view.drawBorder = newValue; }
    get drawShadow() { return this.view.drawShadow; }
    set drawShadow(newValue) { this.view.drawShadow = newValue; }
    get borderRadius() { return this.view.borderRadius; }
    set borderRadius(newValue) { this.view.borderRadius = newValue; }
    redraw() { this.view.redraw(); }
    //////////// Showing and hiding ////////////
    hideShadow() { this.view.hideShadow(); }
    showShadow() { this.view.showShadow(); }
    showDependents() {
        for (let depmob of this.allDependents()) {
            depmob.view.show();
        }
    }
    hideDependents() {
        for (let depmob of this.allDependents()) {
            depmob.view.hide();
        }
    }
    animate(args = {}, seconds) {
        this.motor.animate(args, seconds);
    }
    /*
    Actually we want to hide some more housekeeping code
    behind setting this.parent bc parent and child
    reference each other, and probably the views need
    to be updated.
    */
    get parent() { return this._parent; }
    set parent(newValue) {
        try {
            // there might already be a parent
            this.parent.remove(this);
        }
        catch { }
        this._parent = newValue;
        if (newValue === undefined || newValue == null) {
            return;
        }
        newValue.add(this);
    }
    ancestors() {
        let ret = [];
        let p = this.parent;
        if (p === undefined || p === null) {
            return ret;
        }
        while (p != null) {
            ret.push(p);
            p = p.parent;
        }
        return ret;
    }
    descendsFrom(mob) {
        return this.ancestors().includes(mob);
    }
    isDescendentFrom(mob) {
        return mob.descendsFrom(this);
    }
    //////////// Aliases ////////////
    get superMobject() { return this.parent; }
    set superMobject(newValue) { this.parent = newValue; }
    get submobjects() { return this.children; }
    set submobjects(newValue) { this.children = newValue; }
    get submobs() { return this.submobjects; }
    set submobs(newValue) { this.submobs = newValue; }
    add(submob) {
        // Set this as the submob's parent
        if (submob.parent != this) {
            if (submob.parent !== null && submob.parent !== undefined) {
                submob.parent.remove(submob);
            }
            submob.parent = this;
            submob.parent.frame = this.frame;
        }
        // Add submob to the children
        if (this.children === undefined || this.children === null) {
            throw `Please add submob ${submob.constructor.name} to ${this.constructor.name} later, in setup()`;
        }
        else if (!this.children.includes(submob)) {
            this.children.push(submob);
        }
        // Add its view to this view and redraw
        this.view.add(submob.view);
        submob.view.redraw();
    }
    remove(submob) {
        // Remove from the array of children (with an imported helper method)
        remove(this.children, submob);
        submob.parent = null;
        submob.view.div.remove();
    }
    removeAllChildren() {
        while (this.children.length > 0) {
            let child = this.children.pop();
            child.parent = null;
            child.view.div.remove();
        }
    }
    moveToTop(submob) {
        /*
        Put this submob in front of every other sibling,
        so that it will obstruct them and catch screen events
        */
        if (submob.parent != this) {
            return;
        }
        this.remove(submob);
        this.add(submob);
    }
    dependents() {
        // All mobjects that depend directly on this
        let dep = [];
        for (let d of this.dependencies) {
            dep.push(d.target);
        }
        return dep;
    }
    allDependents() {
        // All mobjects that depend either directly or indirectly on this
        let dep = this.dependents();
        for (let mob of dep) {
            dep.push(...mob.allDependents());
        }
        return dep;
    }
    dependsOn(otherMobject) {
        return otherMobject.allDependents().includes(this);
    }
    addDependency(outputName, target, inputName, refresh = true) {
        if (this.dependsOn(target)) {
            throw 'Circular dependency!';
        }
        let dep = new Dependency({
            source: this,
            outputName: outputName,
            target: target,
            inputName: inputName
        });
        this.dependencies.push(dep);
        if (refresh) {
            let dict = {};
            if (typeof this[outputName] === 'function') {
                dict[inputName] = this[outputName]();
            }
            else {
                dict[inputName] = this[outputName];
            }
            target.update(dict);
        }
    }
    removeDependency(dep) {
        remove(this.dependencies, dep);
    }
    removeAllDependents() {
        clear(this.dependencies);
    }
    getDependency(outputName, target, inputName) {
        for (let dep of this.dependencies) {
            if (dep.outputName == outputName && dep.target == target && dep.inputName == inputName) {
                return dep;
            }
        }
        return null;
    }
    removeDependencyBetween(outputName, target, inputName) {
        let dep = this.getDependency(outputName, target, inputName);
        if (dep) {
            this.removeDependency(dep);
        }
    }
    addDependent(target) {
        /*
        No properties given. Simply, if this mobject updates,
        update the target mobject as well.
        */
        this.addDependency(null, target, null);
    }
    //////////// Update methods ////////////
    synchronizeUpdateArguments(args = {}) {
        let syncedArgs = copy(args);
        let a = args['anchor'];
        if (a !== undefined) {
            let t = args['transform'] ?? this.view?.frame.transform ?? Transform.identity();
            t.anchor = a;
            syncedArgs['transform'] = t;
            delete syncedArgs['anchor'];
        }
        return syncedArgs;
    }
    update(args = {}, redraw = true) {
        super.update(args);
        // TODO: move to CindyCanvas
        if (this.view != null) {
            this.view.div.setAttribute('screen-event-handler', ScreenEventHandler[this.sensor.screenEventHandler]);
            if (this.sensor.screenEventHandler == ScreenEventHandler.Below) {
                this.view.div.style['pointer-events'] = 'none';
            }
            else {
                this.view.div.style['pointer-events'] = 'auto';
            }
        }
        if (redraw) {
            this.view.redraw();
        }
    }
    getUpdateCalls() {
        let ret = new UpdateCalls();
        for (let dep of this.dependencies) {
            let dict = {};
            if (typeof this[dep.outputName] == 'function') {
                dict[dep.inputName] = this[dep.outputName].bind(this);
            }
            else {
                dict[dep.inputName] = this[dep.outputName];
            }
            let updateCall = new UpdateCall(dep.target, dict);
            ret.includeCall(updateCall);
            ret.includeCalls(dep.target.getUpdateCalls());
        }
        return ret;
    }
    updateDependents() {
        let calls = this.getUpdateCalls();
        calls.call();
    }
    disable() { this.sensor.disable(); }
    enable() { this.sensor.enable(); }
    get screenEventHandler() { return this.sensor.screenEventHandler; }
    set screenEventHandler(newValue) { this.sensor.screenEventHandler = newValue; }
    /*
    The following empty methods need to be declared here
    so we can manipulate and override them later.
    */
    onPointerDown(e) { }
    onPointerMove(e) { }
    onPointerUp(e) { }
    onTap(e) { }
    onMereTap(e) { }
    onDoubleTap(e) { }
    onLongPress(e) { }
    onTouchDown(e) { this.onPointerDown(e); }
    onTouchMove(e) { this.onPointerMove(e); }
    onTouchUp(e) { this.onPointerUp(e); }
    onTouchTap(e) { this.onTap(e); }
    onMereTouchTap(e) { this.onMereTap(e); }
    onDoubleTouchTap(e) { this.onDoubleTap(e); }
    onLongTouchDown(e) { this.onLongPress(e); }
    onPenDown(e) { this.onPointerDown(e); }
    onPenMove(e) { this.onPointerMove(e); }
    onPenUp(e) { this.onPointerUp(e); }
    onPenTap(e) { this.onTap(e); }
    onMerePenTap(e) { this.onMereTap(e); }
    onDoublePenTap(e) { this.onDoubleTap(e); }
    onLongPenDown(e) { this.onLongPress(e); }
    onMouseDown(e) { this.onPointerDown(e); }
    onMouseMove(e) { this.onPointerMove(e); }
    onMouseUp(e) { this.onPointerUp(e); }
    onMouseClick(e) { this.onTap(e); }
    onMereMouseClick(e) { this.onMereTap(e); }
    onDoubleMouseClick(e) { this.onDoubleTap(e); }
    onLongMouseDown(e) { this.onLongPress(e); }
    onPointerOut(e) { }
    setDragging(flag) {
        if (flag) {
            if (this.draggingEnabled) {
                return;
            }
            this.sensor.setTouchMethodsTo(this.startDragging.bind(this), this.dragging.bind(this), this.endDragging.bind(this));
            this.sensor.setPenMethodsTo(this.startDragging.bind(this), this.dragging.bind(this), this.endDragging.bind(this));
            this.sensor.setMouseMethodsTo(this.startDragging.bind(this), this.dragging.bind(this), this.endDragging.bind(this));
        }
        else {
            if (!this.draggingEnabled) {
                return;
            }
            this.sensor.restoreTouchMethods();
            this.sensor.restorePenMethods();
            this.sensor.restoreMouseMethods();
        }
        this.draggingEnabled = flag;
    }
    startDragging(e) {
        this.dragAnchorStart = vertexSubtract(this.view.frame.anchor, eventVertex(e));
        this.hideShadow();
        this.parent.update();
    }
    dragging(e) {
        if (this.dragAnchorStart == null) {
            return;
        }
        this.update({
            anchor: vertexAdd(eventVertex(e), this.dragAnchorStart)
        });
        this.redraw(); // fixes dragging bug
    }
    endDragging(e) {
        this.dragAnchorStart = null;
        this.showShadow();
    }
    focus() {
        getPaper().focusOn(this);
    }
    blur() {
        getPaper().blurFocusedChild();
    }
}
//# sourceMappingURL=Mobject.js.map