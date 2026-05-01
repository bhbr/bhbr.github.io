import { Circle } from '../../core/shapes/Circle.js';
import { Color } from '../../core/classes/Color.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { BUTTON_RADIUS, OPTION_SPACING } from './button_geometry.js';
import { MAX_TAP_DELAY } from '../../core/constants.js';
import { TextLabel } from '../../core/mobjects/TextLabel.js';
import { separateSidebar } from '../../core/mobjects/screen_events.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
import { SidebarButtonView } from './SidebarButtonView.js';
import { Pill } from '../../core/shapes/Pill.js';
import { isTouchDevice } from '../../core/mobjects/screen_events.js';
export const buttonDict = {};
export class SidebarButton extends Pill {
    defaults() {
        return {
            baseColor: Color.gray(0.4),
            baseRadius: BUTTON_RADIUS,
            smallLabelFontSize: 12,
            bigLabelFontSize: 14,
            activeScalingFactor: 1.2,
            optionSpacing: OPTION_SPACING,
            label: new TextLabel({
                verticalAlign: 'center',
                horizontalAlign: 'center'
            }),
            labelWidth: 85,
            labelHeight: 25,
            icons: [],
            iconSize: 40,
            innerCircle: new Circle({
                midpoint: [BUTTON_RADIUS, BUTTON_RADIUS],
                radius: 0.9 * BUTTON_RADIUS,
                fillOpacity: 1,
                fillColor: Color.gray(0.2),
                strokeWidth: 0
            }),
            selectMessages: [],
            deselectMessages: [],
            strokeWidth: 0,
            screenEventHandler: ScreenEventHandler.Self,
            locationIndex: 0,
            radius: BUTTON_RADIUS,
            width: 2 * BUTTON_RADIUS,
            frameWidth: 2 * BUTTON_RADIUS,
            frameHeight: 2 * BUTTON_RADIUS,
            fillOpacity: 1.0,
            activeKeyboard: true,
            paper: null,
            sidebar: null,
            view: new SidebarButtonView({
                radius: BUTTON_RADIUS
            }),
            touchStartLocation: null,
            touchStartTime: null,
            pressed: false,
            expanded: false,
            selectedIndex: 0,
            shortcutKey: '1',
            shortcutLabel: new TextLabel({
                frameWidth: 13,
                frameHeight: 13,
                textColor: Color.gray(0.5)
            })
        };
    }
    mutabilities() {
        return {
            baseColor: 'in_subclass',
            bigLabelFontSize: 'on_init',
            smallLabelFontSize: 'never',
            optionSpacing: 'never',
            label: 'never',
            icon: 'on_init',
            selectMessages: 'on_update',
            deselectMessages: 'on_update',
            messageKey: 'on_init'
        };
    }
    setup() {
        super.setup();
        buttonDict[this.constructor.name] = this.constructor;
        this.add(this.innerCircle);
        this.label.view.hide();
        this.setupMessages();
        this.setupBaseIcon();
        this.setupOtherIcons();
        this.addDependency('midpoint', this.label, 'midpoint');
        this.view.update({
            fillColor: this.baseColor
        });
        this.label.update({
            frameWidth: this.labelWidth,
            frameHeight: this.labelHeight,
            backgroundColor: this.innerCircle.fillColor,
            borderColor: this.baseColor,
            borderWidth: 2,
            borderRadius: 7,
            drawShadow: false,
            text: this.baseMessageKey(),
            horizontalAlign: 'center',
            verticalAlign: 'center',
            fontSize: this.bigLabelFontSize
        });
        this.label.view.div.style.paddingLeft = `5px`;
        this.label.view.div.style.paddingRight = `5px`;
        this.updateLabelText();
        if (!separateSidebar) {
            const paperDiv = document.querySelector('#paper_id');
            if (paperDiv !== null) {
                let paperView = paperDiv['view'];
                if (paperView !== null) {
                    this.paper = paperView['mobject'];
                }
            }
        }
        this.shortcutLabel.update({
            text: this.shortcutKey,
            anchor: [-18, this.baseRadius - this.shortcutLabel.frameHeight / 2 - 2]
        });
        if (!isTouchDevice) {
            this.add(this.shortcutLabel);
        }
    }
    setupMessages() {
        // subclassed in CreativeButton
    }
    baseIconName() {
        return this.baseMessageKey().replaceAll(' ', '_');
    }
    baseMessageKey() {
        return Object.keys(this.selectMessages[0])[0];
    }
    setupBaseIcon() {
        let baseIcon = new ImageView({
            imageLocation: `../../assets/${this.baseIconName()}.png`,
            frameWidth: this.iconSize,
            frameHeight: this.iconSize
        });
        this.icons.push(baseIcon);
        this.view.add(baseIcon);
        // Center the icon inside the pill.
        baseIcon.update({
            anchor: [
                BUTTON_RADIUS - 0.5 * this.iconSize,
                BUTTON_RADIUS - 0.5 * this.iconSize
            ]
        });
    }
    setupOtherIcons() {
        for (let i = 1; i < this.nbOptions(); i++) {
            let iconName = this.imageNameForIndex(i).replaceAll(' ', '_');
            let icon = new ImageView({
                imageLocation: `../../assets/${iconName}.png`,
                frameWidth: this.iconSize,
                frameHeight: this.iconSize,
                anchor: [this.icons[0].anchor[0] + i * this.optionSpacing, this.icons[0].anchor[1]]
            });
            this.icons.push(icon);
        }
    }
    labelFromMessage(msg) {
        return Object.keys(msg)[0];
    }
    showOptions() {
        this.update({
            width: 2 * this.baseRadius + (this.nbOptions() - 1) * this.optionSpacing
        });
        for (let i = 1; i < this.nbOptions(); i++) {
            this.view.add(this.icons[i]);
        }
    }
    hideOptions() {
        this.update({
            width: 2 * this.baseRadius
        });
        for (let i = 1; i < this.nbOptions(); i++) {
            this.icons[i].div.remove();
        }
        this.highlightOption(0);
    }
    highlightOption(i) {
        this.innerCircle.update({
            midpoint: [this.baseRadius + i * this.optionSpacing, this.baseRadius]
        });
    }
    isActive() {
        return this.sidebar.activeButton === this;
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
    updateLabelText() {
        let msg = this.selectMessages[this.selectedIndex];
        let text = this.labelFromMessage(msg);
        this.label.update({
            text: text,
            fontSize: (text.length < 15) ? this.bigLabelFontSize : this.smallLabelFontSize
        });
    }
    updateHelpText() {
        this.paper.helpTextLabel.update({
            text: this.paper.helpTexts[this.selectedMessageKey()]
        });
    }
    selectedMessageKey() {
        return Object.keys(this.selectMessages)[this.selectedIndex];
    }
    imageNameForIndex(index) {
        return (Object.keys(this.selectMessages[index] ?? {}) ?? ['key'])[0];
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        this.updateLabelText();
        let shortcutKey = args['shortcutKey'];
        if (shortcutKey) {
            this.shortcutLabel.update({
                text: shortcutKey
            });
        }
        if (redraw) {
            this.view.redraw();
        }
    }
    xShift(e) {
        let t = null;
        if (e instanceof MouseEvent) {
            t = e;
        }
        else {
            t = e.changedTouches[0];
        }
        let p = this.sensor.localEventVertex(e);
        var dx = p[0] - this.baseRadius + this.sidebar.frameWidth;
        dx = Math.min(Math.max(dx, 0), this.optionSpacing * (this.selectMessages.length - 1));
        return dx;
    }
    nbOptions() {
        return this.selectMessages.length;
    }
    triggerSelectedOption() {
        this.messagePaper(this.selectMessages[this.selectedIndex]);
        this.highlightOption(this.selectedIndex);
        this.updateLabelText();
        this.label.update({
            anchor: [10 + this.optionSpacing * this.selectedIndex, this.anchor[1] - 38]
        });
    }
    computeSelectedIndex(e) {
        let dx = this.xShift(e);
        this.selectedIndex = Math.round(dx / this.optionSpacing);
    }
    commonButtonDown() {
        this.touchStartTime = Date.now();
        if (!this.sidebar) {
            return;
        }
        this.label.view.show();
        if (!this.isActive()) {
            // pressed for the first time
            this.sidebar.setActiveButton(this);
            this.messagePaper(this.selectMessages[0]);
            this.update({
                pressed: true,
                expanded: true
            });
            this.showOptions();
            this.updateLabelText();
            this.label.update({
                anchor: [10, this.anchor[1] - 38]
            });
        }
        else {
            // pressed on an option
            this.triggerSelectedOption();
            this.updateLabelText();
            this.label.update({
                anchor: [10 + this.optionSpacing * this.selectedIndex, this.anchor[1] - 38]
            });
        }
    }
    onPointerDown(e) {
        this.computeSelectedIndex(e);
        this.commonButtonDown();
    }
    commonButtonUp() {
        if (Date.now() - this.touchStartTime < MAX_TAP_DELAY) {
            this.commonButtonTap();
        }
        else {
            this.commonMereButtonUp();
        }
    }
    commonMereButtonUp() {
        if (!this.sidebar || !this.isActive()) {
            return;
        }
        this.sidebar.setActiveButton(null);
        this.messagePaper(this.deselectMessages[this.selectedIndex]);
        this.update({
            pressed: false,
            expanded: false
        });
        this.hideOptions();
        this.label.view.hide();
    }
    commonButtonTap() { }
    onPointerUp(e) {
        this.computeSelectedIndex(e);
        this.commonButtonUp();
        this.touchStartTime = null;
    }
    onPointerMove(e) {
        let dx = this.xShift(e);
        this.innerCircle.update({
            midpoint: [this.baseRadius + dx, this.baseRadius]
        });
        let previousIndex = this.selectedIndex;
        this.computeSelectedIndex(e);
        if (this.selectedIndex != previousIndex) {
            this.messagePaper(this.selectMessages[this.selectedIndex]);
            this.updateLabelText();
        }
        this.label.update({
            anchor: [10 + dx, this.anchor[1] - 38]
        });
    }
    buttonDownByKey(key) {
        if (!this.activeKeyboard) {
            return;
        }
        if (key == this.shortcutKey) {
            this.update({ selectedIndex: 0 });
            this.commonButtonDown();
        }
        else if (key == 'ArrowRight' && this.isActive()) {
            this.update({ selectedIndex: this.selectedIndex + 1 });
            this.triggerSelectedOption();
        }
        else if (key == 'ArrowLeft' && this.isActive()) {
            this.update({ selectedIndex: this.selectedIndex - 1 });
            this.triggerSelectedOption();
        }
        else if (key == 'Escape' && this.isActive()) {
            this.commonButtonUp();
        }
    }
    buttonUpByKey(key) {
        if (!this.activeKeyboard) {
            return;
        }
        if (key == this.shortcutKey) {
            this.commonButtonUp();
        }
    }
}
//# sourceMappingURL=SidebarButton.js.map