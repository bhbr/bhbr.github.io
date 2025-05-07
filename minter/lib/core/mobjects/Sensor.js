import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { ScreenEventHandler, ScreenEventDevice, ScreenEventType, screenEventDevice, screenEventType, eventVertex, isTouchDevice } from './screen_events.js';
import { MAX_TAP_DELAY, MERE_TAP_DELAY, LONG_PRESS_DURATION } from '../../core/constants.js';
import { getPaper } from '../../core/functions/getters.js';
export class Sensor extends ExtendedObject {
    defaults() {
        return {
            mobject: null,
            screenEventHandler: ScreenEventHandler.Parent,
            savedScreenEventHandler: null,
            eventTarget: null,
            screenEventHistory: [],
            screenEventDevice: null,
            eventStartTime: 0,
        };
    }
    mutabilities() {
        return {};
    }
    /*
    Methods for temporarily disabling interactivity on a mobject
    (e. g. when dragging a CindyCanvas)
    */
    disable() {
        if (this.isDisabled()) {
            return;
        }
        this.savedScreenEventHandler = this.screenEventHandler;
        this.screenEventHandler = ScreenEventHandler.Parent; // .Below?
    }
    enable() {
        if (this.isEnabled()) {
            return;
        }
        this.screenEventHandler = this.savedScreenEventHandler;
        this.savedScreenEventHandler = null;
    }
    isEnabled() {
        return (this.savedScreenEventHandler === null);
    }
    isDisabled() {
        return !this.isEnabled();
    }
    /*
    Finding the event target

    Depending on the screenEventHandler:

    - .Below: mobject is transparent (via CSS), the sibling mobject
              underneath or the parent should handle the event
              Example: TwoPointCircle in a Construction
    - .Auto:  don't interfere with event propagation at all
              Example: CindyCanvas

    Otherwise the event is captured by the topmost view (paper or sidebar),
    the automatic propagation is stopped and the event is passed onto the
    eventTarget as determined by the declared screenEventHandlers in the
    chain of possible event targets.
    The event target is the lowest mobject willing to handle it and that
    is not underneath a mobject that wants its parent to handle it.

    - .Parent: the parent should handle it
    - .Self:   handle it if no child wants to handle it and if no parent wants
               its parent to handle it
    */
    eventTargetMobject(e) {
        /*
        Find the lowest Mobject willing and allowed to handle the event
        General rule: the event is handled by the lowest submob that can handle it
        and that is not underneath a mobject that wants its parent to handle it.
        If the event policies end in a loop, no one handles it.
        */
        var t = e.target;
        if (t == this.mobject.view.div) {
            return this.mobject;
        }
        let targetMobChain = this.eventTargetMobjectChain(e); // defined below
        var m;
        while (targetMobChain.length > 0) {
            m = targetMobChain.pop();
            if (m === undefined) {
                return this.mobject;
            }
            if (m.sensor.screenEventHandler == ScreenEventHandler.Parent) {
                continue;
            }
            if ((m.sensor.screenEventHandler == ScreenEventHandler.Self || m.sensor.screenEventHandler == ScreenEventHandler.Auto)) {
                return m;
            }
        }
        // if all of this fails, this mob must handle the event itself
        return this.mobject;
    }
    eventTargetMobjectChain(e) {
        // Collect the chain of corresponding target mobjects (highest to lowest)
        let targetDivChain = this.eventTargetDivChain(e); // defined below
        let targetMobChain = [];
        for (var div of targetDivChain.values()) {
            try {
                let m = div['view'].mobject;
                let mob = m;
                // only consider targets above the first mobject
                // with ScreenEventHandler.Parent
                targetMobChain.push(mob);
            }
            catch {
                continue;
            }
        }
        return targetMobChain;
    }
    eventTargetDivChain(e) {
        // Collect the chain of target views (highest to lowest)
        var t = e.target;
        if (t.tagName == 'path') {
            t = t.parentElement.parentElement;
        }
        // the mob whose view contains the svg element containing the path
        if (t.tagName == 'svg') {
            t = t.parentElement;
        } //.parentElement }
        // we hit an svg outside its path (but inside its bounding box),
        // so ignore the corresponding mob and pass the event on to its parent
        let targetDivChain = [t];
        while (t != undefined && t != this.mobject.view.div) {
            t = t.parentElement;
            targetDivChain.push(t);
        }
        return targetDivChain.reverse();
    }
    /*
    Captured event methods
    */
    capturedOnPointerDown(e) {
        if (this.eventStartTime == 0) {
            this.eventStartTime = e.timeStamp;
        }
        let target = this.eventTargetMobject(e);
        this.eventTarget = target;
        if (target == null) {
            return;
        }
        if (target.sensor.screenEventHandler == ScreenEventHandler.Auto) {
            return;
        }
        e.stopPropagation();
        if (this.eventTarget.preventDefault) {
            e.preventDefault();
        }
        this.clearResetPointer();
        this.clearDeleteHistoryTimeout();
        this.decideEventAction(e);
    }
    capturedOnPointerMove(e) {
        let target = this.eventTarget;
        if (target == null || this.screenEventDevice == null) {
            return;
        }
        if (target.sensor.screenEventHandler == ScreenEventHandler.Auto) {
            return;
        }
        e.stopPropagation();
        if (this.eventTarget.preventDefault) {
            e.preventDefault();
        }
        switch (this.screenEventDevice) {
            case ScreenEventDevice.Finger:
                target.sensor.onTouchMove(e);
                break;
            case ScreenEventDevice.Pen:
                target.sensor.onPenMove(e);
                break;
            case ScreenEventDevice.Mouse:
                target.sensor.onMouseMove(e);
                break;
            default:
                throw `Unknown pointer device ${target.sensor.screenEventDevice}`;
        }
    }
    capturedOnPointerUp(e) {
        let target = this.eventTarget;
        if (target == null || this.screenEventDevice == null) {
            return;
        }
        if (target.sensor.screenEventHandler == ScreenEventHandler.Auto) {
            return;
        }
        e.stopPropagation();
        if (this.eventTarget.preventDefault) {
            e.preventDefault();
        }
        this.decideEventAction(e);
        if (this.deleteHistoryTimeoutID != null) {
            return;
        }
        this.deleteHistoryTimeoutID = window.setTimeout(this.deleteScreenEventHistory.bind(this), 1000);
    }
    capturedOnPointerOut(e) {
        let target = this.eventTarget;
        if (target == null || this.screenEventDevice == null) {
            return;
        }
        if (target.sensor.screenEventHandler == ScreenEventHandler.Auto) {
            return;
        }
        e.stopPropagation();
        if (this.eventTarget.preventDefault) {
            e.preventDefault();
        }
        target.sensor.onPointerOut(e);
        this.deleteScreenEventHistory();
    }
    decideEventAction(e) {
        let device = screenEventDevice(e);
        let type = screenEventType(e);
        if (e instanceof MouseEvent && device == ScreenEventDevice.Pen && type == ScreenEventType.Down) {
            //log('case 1')
            this.eventTarget.sensor.rawOnPenDown(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.screenEventDevice = ScreenEventDevice.Pen;
        }
        else if (e instanceof PointerEvent && device == ScreenEventDevice.Pen && type == ScreenEventType.Up) {
            //log('case 2')
            this.eventTarget.sensor.rawOnPenUp(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.resetPointer();
        }
        else if (e instanceof MouseEvent && device == ScreenEventDevice.Pen && type == ScreenEventType.Up) {
            //log('case 3')
            // ignore
        }
        else if (e instanceof MouseEvent && device == ScreenEventDevice.Finger && type == ScreenEventType.Down) {
            //log('case 4')
            this.eventTarget.sensor.rawOnTouchDown(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.screenEventDevice = ScreenEventDevice.Finger;
        }
        else if (e instanceof PointerEvent && device == ScreenEventDevice.Finger && type == ScreenEventType.Up) {
            //log('case 5')
            this.eventTarget.sensor.rawOnTouchUp(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.resetPointer();
        }
        else if (e instanceof MouseEvent && device == ScreenEventDevice.Finger && type == ScreenEventType.Up) {
            //log('case 6')
            // ignore
        }
        else if (e instanceof MouseEvent && device == ScreenEventDevice.Mouse && type == ScreenEventType.Down) {
            if (this.screenEventDevice == ScreenEventDevice.Finger) {
                //log('case 7a')
                // ignore
            }
            else if (this.screenEventDevice == ScreenEventDevice.Pen) {
                //log('case 7b')
                // ignore
            }
            else {
                //log('case 7c')
                this.eventTarget.sensor.rawOnMouseDown(e);
                this.eventTarget.sensor.registerScreenEvent(e);
                this.screenEventDevice = ScreenEventDevice.Mouse;
            }
        }
        else if (e instanceof PointerEvent && device == ScreenEventDevice.Mouse && type == ScreenEventType.Up) {
            if (this.screenEventDevice == ScreenEventDevice.Finger) {
                if (isTouchDevice) {
                    //log('case 8a1')
                    this.eventTarget.sensor.rawOnTouchUp(e);
                    this.eventTarget.sensor.registerScreenEvent(e);
                    this.resetPointerTimeoutID = window.setTimeout(this.resetPointer.bind(this), 250);
                }
                else {
                    //log('case 8a2')
                    // ignore
                }
            }
            else if (this.screenEventDevice == ScreenEventDevice.Pen) {
                if (isTouchDevice) {
                    //log('case 8b1')
                    this.eventTarget.sensor.rawOnPenUp(e);
                    this.eventTarget.sensor.registerScreenEvent(e);
                    this.resetPointerTimeoutID = window.setTimeout(this.resetPointer.bind(this), 250);
                }
                else {
                    //log('case 8b2')
                    // ignore
                }
            }
            else {
                //log('case 8c')
                this.eventTarget.sensor.rawOnMouseUp(e);
                this.eventTarget.sensor.registerScreenEvent(e);
                this.resetPointerTimeoutID = window.setTimeout(this.resetPointer.bind(this), 250);
            }
        }
        else if (e instanceof MouseEvent && device == ScreenEventDevice.Mouse && type == ScreenEventType.Up) {
            // ignore
            //log('case 9')
        }
        else if (e instanceof TouchEvent && device == ScreenEventDevice.Finger && type == ScreenEventType.Down) {
            //log('case 10')
            this.eventTarget.sensor.rawOnTouchDown(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.screenEventDevice = ScreenEventDevice.Finger;
        }
        else if (e instanceof TouchEvent && device == ScreenEventDevice.Pen && type == ScreenEventType.Down) {
            //log('case 11')
            this.eventTarget.sensor.rawOnPenDown(e);
            this.eventTarget.sensor.registerScreenEvent(e);
            this.screenEventDevice = ScreenEventDevice.Pen;
        }
        else {
            //log('case 12')
            // ignore
        }
    }
    resetPointer() {
        this.screenEventDevice = null;
        this.resetPointerTimeoutID = null;
    }
    clearResetPointer() {
        window.clearTimeout(this.resetPointerTimeoutID);
        this.resetPointerTimeoutID = null;
    }
    registerScreenEvent(e) {
        this.screenEventHistory.push(e);
    }
    rawOnTouchDown(e) {
        this.longPressTimeoutID = window.setTimeout(this.onLongTouchDown, LONG_PRESS_DURATION);
        this.onTouchDown(e);
    }
    rawOnTouchUp(e) {
        let e1 = this.screenEventHistory[this.screenEventHistory.length - 1];
        if (e.timeStamp - e1.timeStamp < MAX_TAP_DELAY) {
            this.clearMereTapTimeout();
            this.onTouchTap(e);
            this.mereTapTimeoutID = window.setTimeout(function () {
                this.mereTapTimeoutID = null;
                if (this.screenEventHistory.length == 2) {
                    this.onMereTouchTap(e);
                }
            }.bind(this), MERE_TAP_DELAY);
            if (this.screenEventHistory.length == 3) {
                let e2 = this.screenEventHistory[this.screenEventHistory.length - 2];
                let e3 = this.screenEventHistory[this.screenEventHistory.length - 3];
                if (e1.timeStamp - e2.timeStamp < MAX_TAP_DELAY && e2.timeStamp - e3.timeStamp < MAX_TAP_DELAY) {
                    this.onDoubleTouchTap(e);
                }
            }
        }
        this.onTouchUp(e);
    }
    rawOnPenDown(e) {
        this.longPressTimeoutID = window.setTimeout(this.onLongPenDown, LONG_PRESS_DURATION);
        this.onPenDown(e);
    }
    rawOnPenUp(e) {
        let e1 = this.screenEventHistory[this.screenEventHistory.length - 1];
        if (e.timeStamp - e1.timeStamp < MAX_TAP_DELAY) {
            this.onPenTap(e);
            this.mereTapTimeoutID = window.setTimeout(function () {
                this.mereTapTimeoutID = null;
                if (this.screenEventHistory.length == 2) {
                    this.onMerePenTap(e);
                }
            }.bind(this), MERE_TAP_DELAY);
            if (this.screenEventHistory.length == 3) {
                let e2 = this.screenEventHistory[this.screenEventHistory.length - 2];
                let e3 = this.screenEventHistory[this.screenEventHistory.length - 3];
                if (e1.timeStamp - e2.timeStamp < MAX_TAP_DELAY && e2.timeStamp - e3.timeStamp < MAX_TAP_DELAY) {
                    this.onDoublePenTap(e);
                }
            }
        }
        this.onPenUp(e);
    }
    rawOnMouseDown(e) {
        this.longPressTimeoutID = window.setTimeout(this.mobject.onLongMouseDown.bind(this.mobject), LONG_PRESS_DURATION);
        this.onMouseDown(e);
    }
    rawOnMouseUp(e) {
        let e1 = this.screenEventHistory[this.screenEventHistory.length - 1];
        if (e.timeStamp - e1.timeStamp < MAX_TAP_DELAY) {
            this.onMouseClick(e);
            this.mereTapTimeoutID = window.setTimeout(function () {
                this.mereTapTimeoutID = null;
                if (this.screenEventHistory.length == 2) {
                    this.onMereMouseClick(e);
                }
            }.bind(this), MERE_TAP_DELAY);
            if (this.screenEventHistory.length == 3) {
                let e2 = this.screenEventHistory[this.screenEventHistory.length - 2];
                let e3 = this.screenEventHistory[this.screenEventHistory.length - 3];
                if (e1.timeStamp - e2.timeStamp < MAX_TAP_DELAY && e2.timeStamp - e3.timeStamp < MAX_TAP_DELAY) {
                    this.onDoubleMouseClick(e);
                }
            }
        }
        this.onMouseUp(e);
    }
    // Local coordinates for use in custom event methods
    localEventVertex(e) {
        /*
        eventVertex(e) gives the coordinates in the topmost
        mobject's frame (paper or sidebar). This method here
        finds them in the mobject's local frame.
        */
        let p = eventVertex(e);
        let rt = this.mobject.view.frame.relativeTransform(getPaper().frame);
        let q = rt.inverse().appliedTo(p);
        return q;
    }
    // Cleanup methods
    deleteScreenEventHistory() {
        this.screenEventHistory = [];
        this.eventTarget = null;
        this.deleteHistoryTimeoutID = null;
    }
    clearDeleteHistoryTimeout() {
        if (this.deleteHistoryTimeoutID) {
            clearTimeout(this.deleteHistoryTimeoutID);
            this.deleteHistoryTimeoutID = null;
        }
    }
    clearMereTapTimeout() {
        if (this.mereTapTimeoutID) {
            window.clearInterval(this.mereTapTimeoutID);
            this.mereTapTimeoutID = null;
        }
    }
    onPointerDown(e) { this.mobject.onPointerDown(e); }
    onPointerMove(e) { this.mobject.onPointerMove(e); }
    onPointerUp(e) { this.mobject.onPointerUp(e); }
    onTap(e) { this.mobject.onTap(e); }
    onMereTap(e) { this.mobject.onMereTap(e); }
    onDoubleTap(e) { this.mobject.onDoubleTap(e); }
    onLongPress(e) { this.mobject.onLongPress(e); }
    onTouchDown(e) { this.mobject.onTouchDown(e); }
    onTouchMove(e) { this.mobject.onTouchMove(e); }
    onTouchUp(e) { this.mobject.onTouchUp(e); }
    onTouchTap(e) { this.mobject.onTouchTap(e); }
    onMereTouchTap(e) { this.mobject.onMereTouchTap(e); }
    onDoubleTouchTap(e) { this.mobject.onDoubleTouchTap(e); }
    onLongTouchDown(e) { this.mobject.onLongTouchDown(e); }
    onPenDown(e) { this.mobject.onPenDown(e); }
    onPenMove(e) { this.mobject.onPenMove(e); }
    onPenUp(e) { this.mobject.onPenUp(e); }
    onPenTap(e) { this.mobject.onPenTap(e); }
    onMerePenTap(e) { this.mobject.onMerePenTap(e); }
    onDoublePenTap(e) { this.mobject.onDoublePenTap(e); }
    onLongPenDown(e) { this.mobject.onLongPenDown(e); }
    onMouseDown(e) { this.mobject.onMouseDown(e); }
    onMouseMove(e) { this.mobject.onMouseMove(e); }
    onMouseUp(e) { this.mobject.onMouseUp(e); }
    onMouseClick(e) { this.mobject.onMouseClick(e); }
    onMereMouseClick(e) { this.mobject.onMereMouseClick(e); }
    onDoubleMouseClick(e) { this.mobject.onDoubleMouseClick(e); }
    onLongMouseDown(e) { this.mobject.onLongMouseDown(e); }
    onPointerOut(e) { this.mobject.onPointerOut(e); }
    /*
    Backup versions for temporarily disabling
    interactivity on a mobject (e. g. while dragging)
    */
    savedOnTouchDown(e) { }
    savedOnTouchMove(e) { }
    savedOnTouchUp(e) { }
    savedOnTouchTap(e) { }
    savedOnMereTouchTap(e) { }
    savedOnDoubleTouchTap(e) { }
    savedOnLongTouchDown(e) { }
    savedOnPenDown(e) { }
    savedOnPenMove(e) { }
    savedOnPenUp(e) { }
    savedOnPenTap(e) { }
    savedOnMerePenTap(e) { }
    savedOnDoublePenTap(e) { }
    savedOnLongPenDown(e) { }
    savedOnMouseDown(e) { }
    savedOnMouseMove(e) { }
    savedOnMouseUp(e) { }
    savedOnMouseClick(e) { }
    savedOnMereMouseClick(e) { }
    savedOnDoubleMouseClick(e) { }
    savedOnLongMouseDown(e) { }
    savedOnPointerDown(e) { }
    savedOnPointerMove(e) { }
    savedOnPointerUp(e) { }
    savedOnTap(e) { }
    savedOnMereTap(e) { }
    savedOnDoubleTap(e) { }
    savedOnLongPress(e) { }
    // Dragging methods
    setTouchMethodsTo(newOnTouchDown, newOnTouchMove, newOnTouchUp) {
        this.savedOnTouchDown = this.onTouchDown;
        this.savedOnTouchMove = this.onTouchMove;
        this.savedOnTouchUp = this.onTouchUp;
        this.savedOnTouchTap = this.onTouchTap;
        this.savedOnMereTouchTap = this.onMereTouchTap;
        this.savedOnDoubleTouchTap = this.onDoubleTouchTap;
        this.savedOnLongTouchDown = this.onLongTouchDown;
        this.onTouchDown = newOnTouchDown;
        this.onTouchMove = newOnTouchMove;
        this.onTouchUp = newOnTouchUp;
        this.onTouchTap = (e) => { };
        this.onMereTouchTap = (e) => { };
        this.onDoubleTouchTap = (e) => { };
        this.onLongTouchDown = (e) => { };
    }
    setPenMethodsTo(newOnPenDown, newOnPenMove, newOnPenUp) {
        this.savedOnPenDown = this.onPenDown;
        this.savedOnPenMove = this.onPenMove;
        this.savedOnPenUp = this.onPenUp;
        this.savedOnPenTap = this.onPenTap;
        this.savedOnMerePenTap = this.onMerePenTap;
        this.savedOnDoublePenTap = this.onDoublePenTap;
        this.savedOnLongPenDown = this.onLongPenDown;
        this.onPenDown = newOnPenDown;
        this.onPenMove = newOnPenMove;
        this.onPenUp = newOnPenUp;
        this.onPenTap = (e) => { };
        this.onMerePenTap = (e) => { };
        this.onDoublePenTap = (e) => { };
        this.onLongPenDown = (e) => { };
    }
    setMouseMethodsTo(newOnMouseDown, newOnMouseMove, newOnMouseUp) {
        this.savedOnMouseDown = this.onMouseDown;
        this.savedOnMouseMove = this.onMouseMove;
        this.savedOnMouseUp = this.onMouseUp;
        this.savedOnMouseClick = this.onMouseClick;
        this.savedOnMereMouseClick = this.onMereMouseClick;
        this.savedOnDoubleMouseClick = this.onDoubleMouseClick;
        this.savedOnLongMouseDown = this.onLongMouseDown;
        this.onMouseDown = newOnMouseDown;
        this.onMouseMove = newOnMouseMove;
        this.onMouseUp = newOnMouseUp;
        this.onMouseClick = (e) => { };
        this.onMereMouseClick = (e) => { };
        this.onDoubleMouseClick = (e) => { };
        this.onLongMouseDown = (e) => { };
    }
    setPointerMethodsTo(newOnPointerDown, newOnPointerMove, newOnPointerUp) {
        this.savedOnPointerDown = this.onPointerDown;
        this.savedOnPointerMove = this.onPointerMove;
        this.savedOnPointerUp = this.onPointerUp;
        this.savedOnTap = this.onTap;
        this.savedOnMereTap = this.onMereTap;
        this.savedOnDoubleTap = this.onDoubleTap;
        this.savedOnLongPress = this.onLongPress;
        this.onPointerDown = newOnPointerDown;
        this.onPointerMove = newOnPointerMove;
        this.onPointerUp = newOnPointerUp;
        this.onTap = (e) => { };
        this.onMereTap = (e) => { };
        this.onDoubleTap = (e) => { };
        this.onLongPress = (e) => { };
    }
    restoreTouchMethods() {
        this.onTouchDown = this.savedOnTouchDown;
        this.onTouchMove = this.savedOnTouchMove;
        this.onTouchUp = this.savedOnTouchUp;
        this.onTouchTap = this.savedOnTouchTap;
        this.onMereTouchTap = this.savedOnMereTouchTap;
        this.onDoubleTouchTap = this.savedOnDoubleTouchTap;
        this.onLongTouchDown = this.savedOnLongTouchDown;
        this.savedOnTouchDown = (e) => { };
        this.savedOnTouchMove = (e) => { };
        this.savedOnTouchUp = (e) => { };
        this.savedOnTouchTap = (e) => { };
        this.savedOnMereTouchTap = (e) => { };
        this.savedOnDoubleTouchTap = (e) => { };
        this.savedOnLongTouchDown = (e) => { };
    }
    restorePenMethods() {
        this.onPenDown = this.savedOnPenDown;
        this.onPenMove = this.savedOnPenMove;
        this.onPenUp = this.savedOnPenUp;
        this.onPenTap = this.savedOnPenTap;
        this.onMerePenTap = this.savedOnMerePenTap;
        this.onDoublePenTap = this.savedOnDoublePenTap;
        this.onLongPenDown = this.savedOnLongPenDown;
        this.savedOnPenDown = (e) => { };
        this.savedOnPenMove = (e) => { };
        this.savedOnPenUp = (e) => { };
        this.savedOnPenTap = (e) => { };
        this.savedOnMerePenTap = (e) => { };
        this.savedOnDoublePenTap = (e) => { };
        this.savedOnLongPenDown = (e) => { };
    }
    restoreMouseMethods() {
        this.onMouseDown = this.savedOnMouseDown;
        this.onMouseMove = this.savedOnMouseMove;
        this.onMouseUp = this.savedOnMouseUp;
        this.onMouseClick = this.savedOnMouseClick;
        this.onMereMouseClick = this.savedOnMereMouseClick;
        this.onDoubleMouseClick = this.savedOnDoubleMouseClick;
        this.onLongMouseDown = this.savedOnLongMouseDown;
        this.savedOnMouseDown = (e) => { };
        this.savedOnMouseMove = (e) => { };
        this.savedOnMouseUp = (e) => { };
        this.savedOnMouseClick = (e) => { };
        this.savedOnMereMouseClick = (e) => { };
        this.savedOnDoubleMouseClick = (e) => { };
        this.savedOnLongMouseDown = (e) => { };
    }
    restorePointerMethods() {
        this.onPointerDown = this.savedOnPointerDown;
        this.onPointerMove = this.savedOnPointerMove;
        this.onPointerUp = this.savedOnPointerUp;
        this.onTap = this.savedOnTap;
        this.onMereTap = this.savedOnMereTap;
        this.onDoubleTap = this.savedOnDoubleTap;
        this.onLongPress = this.savedOnLongPress;
        this.savedOnPointerDown = (e) => { };
        this.savedOnPointerMove = (e) => { };
        this.savedOnPointerUp = (e) => { };
        this.savedOnTap = (e) => { };
        this.savedOnMereTap = (e) => { };
        this.savedOnDoubleTap = (e) => { };
        this.savedOnLongPress = (e) => { };
    }
}
//# sourceMappingURL=Sensor.js.map