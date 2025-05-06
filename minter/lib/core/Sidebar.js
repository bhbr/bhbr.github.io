import { ScreenEventHandler } from '../core/mobjects/screen_events.js';
import { SIDEBAR_WIDTH } from '../core/constants.js';
import { convertStringToArray } from '../core/functions/arrays.js';
import { getPaper } from '../core/functions/getters.js';
import { Color } from '../core/classes/Color.js';
import { Rectangle } from '../core/shapes/Rectangle.js';
import { buttonCenter } from '../core/sidebar_buttons/button_geometry.js';
import { Mobject } from '../core/mobjects/Mobject.js';
import { DragButton } from '../core/sidebar_buttons/DragButton.js';
import { SidebarView } from './SidebarView.js';
export class Sidebar extends Mobject {
    defaults() {
        return {
            view: new SidebarView(),
            background: new Rectangle({
                fillColor: Color.gray(0.1),
                fillOpacity: 1.0,
                strokeWidth: 0,
                screenEventHandler: ScreenEventHandler.Parent,
                width: SIDEBAR_WIDTH,
                height: Math.max(window.screen.width, window.screen.height) + 500
            }),
            availableButtonClasses: [
                DragButton
            ],
            buttons: [
                new DragButton()
            ],
            frameWidth: SIDEBAR_WIDTH,
            frameHeight: Math.max(window.screen.width, window.screen.height) + 500,
            screenEventHandler: ScreenEventHandler.Self
        };
    }
    mutabilities() {
        return {
            view: 'never',
            background: 'never'
        };
    }
    setup() {
        this.add(this.background);
        this.view.mobject = this;
        let maybePaper = getPaper();
        if (maybePaper != undefined) {
            let paper = maybePaper;
            paper.sidebar = this;
            this.background.update({
                fillColor: paper.background.view.fillColor
            });
        }
        // initialize with the buttons it needs itself
        // (updated later to accomodate sidebar wishes of
        // expandable submobs)
        this.initialize(this.buttonNames());
        super.setup();
        this.requestInit(); // bc only it knows the initial buttons
        this.addDependency('frameWidth', this.background, 'width');
        this.addDependency('frameHeight', this.background, 'height');
    }
    addButton(button) {
        let i = this.buttons.length;
        this.add(button);
        this.buttons.push(button);
        button.update({
            midpoint: buttonCenter(i),
            locationIndex: i
        });
    }
    clear() {
        for (let button of Object.values(this.buttons)) {
            this.remove(button);
            this.buttons.pop();
        }
    }
    createButton(buttonName) {
        for (let buttonClass of this.availableButtonClasses) {
            if (buttonClass.name == buttonName) {
                return new buttonClass();
            }
        }
        throw `Button class ${buttonName} not available!`;
        return null;
    }
    initialize(names) {
        this.clear();
        for (let i = 0; i < names.length; i++) {
            let button = this.createButton(names[i]);
            button.update({
                locationIndex: i,
                key: (i + 1).toString()
            });
            this.addButton(button);
        }
    }
    requestInit() {
        let message = { init: 'sidebar' };
        try {
            let w = window;
            w.webkit.messageHandlers.handleMessageFromSidebar.postMessage(message);
        }
        catch {
            let maybePaper = getPaper();
            if (maybePaper != undefined) {
                let paper = maybePaper;
                paper.getMessage(message);
            }
        }
    }
    buttonForKey(key) {
        for (let b of this.buttons) {
            if (b.key == key) {
                return b;
            }
        }
        return null;
    }
    buttonNames() {
        let ret = [];
        for (let b of this.buttons) {
            ret.push(b.constructor.name);
        }
        return ret;
    }
    handleMessage(key, value) {
        switch (key) {
            case 'init':
                this.initialize(value);
                break;
            case 'buttonDown':
                if (this.activeButton === null || this.activeButton === undefined) {
                    this.activeButton = this.buttonForKey(value);
                }
                if (this.activeButton !== null) {
                    this.activeButton.buttonDownByKey(value);
                }
                break;
            case 'buttonUp':
                if (this.activeButton !== null && this.activeButton !== undefined) {
                    this.activeButton.buttonUpByKey(value);
                    if (this.activeButton.key == value) {
                        this.activeButton = null;
                    }
                }
                break;
        }
    }
    getMessage(message) {
        let key = Object.keys(message)[0];
        let value = Object.values(message)[0];
        let convertedValue = value;
        if (value == "true") {
            convertedValue = true;
        }
        if (value == "false") {
            convertedValue = false;
        }
        if (value[0] == "(") {
            convertedValue = convertStringToArray(value);
        }
        this.handleMessage(key, convertedValue);
    }
}
let creating = false;
//# sourceMappingURL=Sidebar.js.map