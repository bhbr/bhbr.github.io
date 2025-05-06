import { remove, convertStringToArray } from '../core/functions/arrays.js';
import { ScreenEventDevice, separateSidebar, ScreenEventHandler } from '../core/mobjects/screen_events.js';
import { vertexOrigin } from '../core/functions/vertex.js';
import { Board } from '../core/boards/Board.js';
import { Color } from '../core/classes/Color.js';
import { SIDEBAR_WIDTH, COLOR_PALETTE } from '../core/constants.js';
import { PaperView } from './PaperView.js';
export class Paper extends Board {
    defaults() {
        return {
            view: new PaperView(),
            expandedPadding: 0,
            expanded: true,
            screenEventHandler: ScreenEventHandler.Self,
            expandedMobject: this,
            pressedKeys: [],
            activeKeyboard: true,
            currentColor: Color.white(),
            drawShadow: false,
            loadedAPIs: []
        };
    }
    mutabilities() {
        return {
            view: 'never',
            expandedPadding: 'never',
            expanded: 'never',
            drawShadow: 'never'
        };
    }
    setup() {
        super.setup();
        this.expandedMobject = this;
        this.expandButton.view.hide();
        this.expandedInputList.view.hide();
        this.boundButtonUpByKey = this.buttonUpByKey.bind(this);
        this.boundButtonDownByKey = this.buttonDownByKey.bind(this);
        document.addEventListener('keydown', this.boundButtonDownByKey);
        document.addEventListener('keyup', this.boundButtonUpByKey);
        this.background.update({
            cornerRadius: 0,
            strokeColor: Color.clear(),
            strokeWidth: 0.0
        });
        this.background.view.hideShadow();
        let width = window.innerWidth - (separateSidebar ? 0 : SIDEBAR_WIDTH);
        let height = window.innerHeight;
        this.update({
            frameWidth: width,
            frameHeight: height
        });
        this.background.update({
            width: width,
            height: height
        });
        //window.addEventListener('resize', this.resize.bind(this))
        this.resize();
    }
    resize() {
        let size = Math.max(window.screen.width, window.screen.height);
        let buffer = 500;
        this.update({
            frameWidth: size + buffer,
            frameHeight: size + buffer
        });
        this.sidebar?.update({
            frameHeight: size + buffer
        });
    }
    changeColorByName(newColorName) {
        let newColor = COLOR_PALETTE[newColorName];
        this.changeColor(newColor);
    }
    changeColor(newColor) {
        this.currentColor = newColor;
    }
    getMessage(message) {
        if (Object.keys(message).length == 0) {
            return;
        }
        let key = Object.keys(message)[0];
        let value = Object.values(message)[0];
        if (value == "true") {
            value = true;
        }
        if (value == "false") {
            value = false;
        }
        if (typeof value == "string") {
            if (value[0] == "(") {
                value = convertStringToArray(value);
            }
        }
        if ((key == "link" || key == "drag") && typeof value === "string") {
            value = (value === "1");
        }
        if (key == "init" && value == "sidebar") {
            this.initSidebar();
        }
        this.expandedMobject.handleMessage(key, value);
    }
    boundButtonDownByKey(e) { }
    boundButtonUpByKey(e) { }
    buttonDownByKey(e) {
        if (!this.activeKeyboard) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        if (this.pressedKeys.includes(e.key)) {
            return;
        }
        let alphanumericKeys = "1234567890qwertzuiopasdfghjklyxcvbnm".split("");
        let specialKeys = [" ", "Alt", "Backspace", "CapsLock", "Control", "Dead", "Escape", "Meta", "Shift", "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
        let availableKeys = alphanumericKeys.concat(specialKeys);
        if (!availableKeys.includes(e.key)) {
            return;
        }
        this.pressedKeys.push(e.key);
        if (e.key == 'Shift') {
            window.emulatedDevice = ScreenEventDevice.Pen;
        }
        else if (e.key == 'Alt') {
            window.emulatedDevice = ScreenEventDevice.Finger;
        }
        else {
            this.messageSidebar({ 'buttonDown': e.key });
        }
    }
    buttonUpByKey(e) {
        if (!this.activeKeyboard) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        remove(this.pressedKeys, e.key);
        if (e.key == 'Shift' || e.key == 'Alt') {
            window.emulatedDevice = ScreenEventDevice.Mouse;
        }
        else {
            this.messageSidebar({ 'buttonUp': e.key });
        }
    }
    expandedAnchor() {
        return separateSidebar ? vertexOrigin() : [SIDEBAR_WIDTH, 0];
    }
    expand() { }
    contract() { }
    showLinksOfContent() {
        // toggled by 'link' button in sidebar
        for (let link of this.links) {
            this.add(link);
        }
        for (let submob of this.linkableChildren()) {
            submob.showLinks();
        }
    }
}
//# sourceMappingURL=Paper.js.map