import { Circle } from '../../core/shapes/Circle.js';
import { Color } from '../../core/classes/Color.js';
import { vertexTranslatedBy } from '../../core/functions/vertex.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { buttonCenter, BUTTON_RADIUS, OPTION_SPACING } from './button_geometry.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { eventVertex, separateSidebar } from '../../core/mobjects/screen_events.js';
import { SidebarButtonView } from './SidebarButtonView.js';
export const buttonDict = {};
export class SidebarButton extends Circle {
    defaults() {
        return {
            baseColor: Color.gray(0.2),
            baseRadius: BUTTON_RADIUS,
            smallLabelFontSize: 12,
            bigLabelFontSize: 12,
            activeScalingFactor: 1.2,
            optionSpacing: OPTION_SPACING,
            label: new TextLabel(),
            labelWidth: 110,
            labelHeight: 25,
            icon: null,
            touchDownMessages: [],
            touchUpMessages: [],
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
            fillOpacity: 1.0,
            activeKeyboard: true,
            paper: null,
            sidebar: null,
            view: new SidebarButtonView({
                radius: BUTTON_RADIUS
            })
        };
    }
    mutabilities() {
        return {
            baseColor: 'in_subclass',
            bigLabelFontSize: 'never',
            smallLabelFontSize: 'never',
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
        this.sidebar?.add(this.label);
        this.label.view.hide();
        if (this.icon) {
            this.updateIcon();
            this.view.add(this.icon);
        }
        this.addDependency('midpoint', this.label, 'midpoint');
        this.updateModeIndex(0);
        this.view.update({
            fillColor: this.baseColor
        });
        this.label.update({
            anchor: [10, this.anchor[1] - 38],
            frameWidth: this.labelWidth,
            frameHeight: this.labelHeight,
            backgroundColor: this.fillColor.brighten(1.2),
            borderColor: this.fillColor.brighten(1.4),
            borderWidth: 2,
            borderRadius: 7,
            drawShadow: false,
            text: this.messageKey,
            horizontalAlign: 'center',
            verticalAlign: 'center',
            fontSize: this.bigLabelFontSize
        });
        this.label.view.div.style.paddingLeft = `5px`;
        this.label.view.div.style.paddingRight = `5px`;
        this.updateLabel();
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
    numberOfIndices() { return this.touchDownMessages.length; }
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
        this.frame.transform.update({
            scale: this.activeScalingFactor
        });
        this.label.view.show();
        if (this.active) {
            this.redraw();
            return;
        }
        this.update({
            active: true,
            previousIndex: this.currentModeIndex,
        });
        this.label.update({
            anchor: [10, this.anchor[1] - 38]
        });
        this.redraw();
        this.updateIcon();
        this.updateLabel();
        if (this.touchDownMessages.length == 0) {
            return;
        }
        this.messagePaper(this.touchDownMessages[0]);
        if (this.sidebar) {
            this.sidebar.activeButton = this;
            this.sidebar.add(this.label);
        }
        this.paper.helpTextLabel.view.show();
    }
    onPointerDown(e) {
        this.commonButtonDown();
        this.touchStart = eventVertex(e);
    }
    onPointerMove(e) {
        if (!this.sidebar.activeButton) {
            return;
        }
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
        newIndex = Math.min(Math.max(newIndex, 0), this.touchDownMessages.length - 1);
        dx += this.previousIndex * this.optionSpacing;
        dx = Math.min(Math.max(dx, 0), this.optionSpacing * (this.touchDownMessages.length - 1));
        let newMidpoint = [
            buttonCenter(this.locationIndex)[0] + dx,
            buttonCenter(this.locationIndex)[1]
        ];
        this.updateModeIndex(newIndex, true);
        this.update({ midpoint: newMidpoint });
    }
    onPointerUp(e) {
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
        if (this.touchUpMessages.length == 1) {
            this.messagePaper(this.touchUpMessages[0]);
        }
        else if (this.touchUpMessages.length > 1) {
            this.messagePaper(this.touchUpMessages[this.currentModeIndex]);
        }
        this.currentModeIndex = 0;
        let dx = this.currentModeIndex * this.optionSpacing;
        let newMidpoint = [
            buttonCenter(this.locationIndex)[0] + dx,
            buttonCenter(this.locationIndex)[1]
        ];
        this.update({
            active: false,
            fillColor: this.colorForIndex(this.currentModeIndex),
            midpoint: newMidpoint
        });
        this.frame.transform.update({
            scale: 1
        });
        this.sidebar.update({
            activeButton: null
        });
        this.redraw();
        this.updateLabel();
        this.updateIcon();
        this.label.view.hide();
        //this.paper.helpTextLabel.view.hide()
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
        let msg = this.touchDownMessages[this.currentModeIndex];
        let text = this.labelFromMessage(msg);
        this.label.update({
            text: text,
            fontSize: (text.length < 15) ? this.bigLabelFontSize : this.smallLabelFontSize
        });
    }
    updateIcon() {
        if (this.icon === undefined || this.icon === null) {
            return;
        }
        let name = this.imageNameForIndex(this.currentModeIndex).replaceAll(' ', '_');
        this.icon.update({
            imageLocation: `../../assets/${name}.png`,
            anchor: [
                0.5 * (this.frameWidth - this.icon.frameWidth),
                0.5 * (this.frameHeight - this.icon.frameHeight)
            ]
        });
    }
    imageNameForIndex(index) {
        return (Object.keys(this.touchDownMessages[index] ?? {}) ?? ['key'])[0];
    }
    update(args = {}, redraw = true) {
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
        let message = this.touchDownMessages[this.currentModeIndex];
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
        if (this.currentModeIndex == this.touchDownMessages.length - 1) {
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
    labelFromMessage(msg) {
        var key = Object.keys(msg)[0];
        if (this.currentModeIndex > 0) {
            key = '&#9666; ' + key;
        }
        if (this.currentModeIndex < this.touchDownMessages.length - 1) {
            key = key + ' &#9656;';
        }
        return key;
    }
}
//# sourceMappingURL=SidebarButton.js.map