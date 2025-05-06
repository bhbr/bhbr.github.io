import { Circle } from '../../core/shapes/Circle.js';
import { Color } from '../../core/classes/Color.js';
import { vertexTranslatedBy, vertexSubtract, vertexMultiply } from '../../core/functions/vertex.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { buttonCenter, BUTTON_RADIUS, BUTTON_SCALE_FACTOR } from './button_geometry.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { eventVertex, separateSidebar } from '../../core/mobjects/screen_events.js';
import { log } from '../../core/functions/logging.js';
export const buttonDict = {};
export class SidebarButton extends Circle {
    defaults() {
        return {
            baseColor: Color.gray(0.4),
            baseRadius: BUTTON_RADIUS,
            baseFontSize: 12,
            activeScalingFactor: 1.2,
            optionSpacing: 25,
            label: new TextLabel(),
            icon: null,
            messages: [],
            outgoingMessage: {},
            strokeWidth: 0,
            screenEventHandler: ScreenEventHandler.Self,
            currentModeIndex: 0,
            previousIndex: 0,
            locationIndex: 0,
            active: false,
            messageKey: 'key',
            radius: BUTTON_RADIUS,
            frameWidth: 2 * BUTTON_RADIUS,
            frameHeight: 2 * BUTTON_RADIUS,
            fillOpacity: 0.5,
            activeKeyboard: true,
            paper: null
        };
    }
    mutabilities() {
        return {
            baseColor: 'in_subclass',
            optionSpacing: 'never',
            label: 'never',
            icon: 'on_init',
            activeScalingFactor: 'never',
            messages: 'on_update',
            outgoingMessage: 'on_update',
            messageKey: 'on_init'
        };
    }
    setup() {
        super.setup();
        buttonDict[this.constructor.name] = this.constructor;
        if (this.label && !this.icon) {
            this.add(this.label);
        }
        if (this.icon) {
            this.updateIcon();
            this.view.add(this.icon);
        }
        this.addDependency('midpoint', this.label, 'midpoint');
        this.updateModeIndex(0);
        this.view.update({
            fillColor: this.baseColor
        });
        this.label?.update({
            frameWidth: 2 * this.baseRadius,
            frameHeight: 2 * this.baseRadius,
            text: this.messageKey
        }, false);
        if (this.label) {
            this.label.view.div.style['font-size'] = `${this.baseFontSize}px`;
            this.label.view.div.style['color'] = Color.white().toHex();
        }
        log(this.label.view.div.style['font-size']);
        if (!separateSidebar) {
            const paperDiv = document.querySelector('#paper_id');
            if (paperDiv !== null) {
                let paperView = paperDiv['view'];
                if (paperView !== null) {
                    this.paper = paperView['mobject'];
                }
            }
        }
    }
    numberOfIndices() { return this.messages.length; }
    colorForIndex(i) {
        return this.baseColor;
    }
    buttonDownByKey(key) {
        if (!this.activeKeyboard) {
            return;
        }
        if (key == this.key) {
            this.commonButtonDown();
        }
        else if (key == 'ArrowRight' && this.active) {
            this.selectNextOption();
        }
        else if (key == 'ArrowLeft' && this.active) {
            this.selectPreviousOption();
        }
    }
    commonButtonDown() {
        if (this.active) {
            return;
        }
        this.messagePaper(this.messages[0]);
        this.update({
            active: true,
            //radius: this.baseRadius * this.activeScalingFactor,
            previousIndex: this.currentModeIndex,
        });
        this.frame.transform.update({
            anchor: vertexSubtract(this.midpoint, vertexMultiply([BUTTON_RADIUS, BUTTON_RADIUS], this.activeScalingFactor)),
            scale: this.activeScalingFactor
        });
        this.redraw();
        //this.label?.view.div.style.setProperty('font-size', `${this.baseFontSize * this.activeScalingFactor}px`)
        this.label?.update({
            frameWidth: 2 * this.radius,
            frameHeight: 2 * this.radius
        });
        this.updateLabel();
        this.updateIcon();
    }
    onPointerDown(e) {
        this.commonButtonDown();
        this.touchStart = eventVertex(e);
    }
    onPointerMove(e) {
        let t = null;
        if (e instanceof MouseEvent) {
            t = e;
        }
        else {
            t = e.changedTouches[0];
        }
        let p = eventVertex(e);
        var dx = p[0] - this.touchStart[0];
        var newIndex = Math.floor(this.previousIndex + dx / this.optionSpacing);
        newIndex = Math.min(Math.max(newIndex, 0), this.messages.length - 1);
        dx += this.previousIndex * this.optionSpacing;
        dx = Math.min(Math.max(dx, 0), this.optionSpacing * (this.messages.length - 1));
        let newMidpoint = [buttonCenter(this.locationIndex)[0] + dx, buttonCenter(this.locationIndex)[1]];
        this.updateModeIndex(newIndex, true);
        this.update({ midpoint: newMidpoint });
    }
    onPointerUp(e) {
        this.commonButtonUp();
    }
    onPointerOut(e) {
        this.commonButtonUp();
    }
    buttonUpByKey(key) {
        if (!this.activeKeyboard) {
            return;
        }
        if (key == this.key) {
            this.commonButtonUp();
        }
    }
    commonButtonUp() {
        this.currentModeIndex = 0;
        let dx = this.currentModeIndex * this.optionSpacing;
        let newMidpoint = [buttonCenter(this.locationIndex)[0] + dx, buttonCenter(this.locationIndex)[1]];
        this.update({
            active: false,
            fillColor: this.colorForIndex(this.currentModeIndex),
            // midpoint: newMidpoint,
            // radius: this.baseRadius,
            // fontSize: this.baseFontSize
        });
        this.frame.transform.update({
            anchor: vertexSubtract(newMidpoint, [BUTTON_RADIUS, BUTTON_RADIUS]),
            scale: 1
        });
        this.redraw();
        //this.label?.view.div.style.setProperty('font-size', `${this.baseFontSize}px`)
        this.label?.update({
            frameWidth: 2 * this.radius,
            frameHeight: 2 * this.radius
        });
        this.updateLabel();
        this.updateIcon();
        this.messagePaper(this.outgoingMessage);
    }
    messagePaper(message) {
        try {
            let w = window;
            w.webkit.messageHandlers.handleMessageFromSidebar.postMessage(message);
        }
        catch {
            this.paper.getMessage(message);
        }
    }
    updateLabel() {
        if (this.label === undefined || this.label === null) {
            return;
        }
        this.label.update({
            frameWidth: 2 * this.radius,
            frameHeight: 2 * this.radius
        });
        let f = this.active ? BUTTON_SCALE_FACTOR : 1;
        let fs = f * (this.baseFontSize); // ?? 12)
        this.label.view?.div.style.setProperty('font-size', fs.toString().concat('px'));
        if (this.label) {
            try {
                let msg = this.messages[this.currentModeIndex];
                this.label.update({
                    text: this.labelFromMessage(msg)
                });
            }
            catch { }
        }
        else {
            this.label.text = '';
        }
    }
    updateIcon() {
        if (this.icon === undefined || this.icon === null) {
            return;
        }
        let name = this.imageNameForIndex(this.currentModeIndex);
        this.icon.update({
            imageLocation: `../../assets/${name}.png`,
            anchor: [
                0.5 * (this.frameWidth - this.icon.frameWidth),
                0.5 * (this.frameHeight - this.icon.frameHeight)
            ]
        });
    }
    imageNameForIndex(index) {
        return 'key';
    }
    labelFromMessage(msg) {
        return Object.keys(msg)[0];
    }
    update(args = {}, redraw = true) {
        //args['midpoint'] = buttonCenter(this.locationIndex)
        super.update(args, false);
        this.updateLabel();
        if (redraw) {
            this.view.redraw();
        }
    }
    updateModeIndex(newIndex, withMessage = {}) {
        if (newIndex == this.currentModeIndex || newIndex == -1) {
            return;
        }
        this.currentModeIndex = newIndex;
        let message = this.messages[this.currentModeIndex];
        this.update({
            fillColor: this.colorForIndex(this.currentModeIndex)
        });
        if (withMessage) {
            this.messagePaper(message);
        }
        this.updateLabel();
        this.updateIcon();
    }
    selectNextOption() {
        if (this.currentModeIndex == this.messages.length - 1) {
            return;
        }
        this.update({
            midpoint: vertexTranslatedBy(this.midpoint, [this.optionSpacing, 0])
        });
        this.updateModeIndex(this.currentModeIndex + 1, true);
    }
    selectPreviousOption() {
        if (this.currentModeIndex == 0) {
            return;
        }
        this.update({
            midpoint: vertexTranslatedBy(this.midpoint, [-this.optionSpacing, 0])
        });
        this.updateModeIndex(this.currentModeIndex - 1, true);
    }
}
//# sourceMappingURL=SidebarButton.js.map