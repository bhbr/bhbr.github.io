import { Linkable } from '../../../core/linkables/Linkable.js';
import { getPaper } from '../../../core/functions/getters.js';
import { View } from '../../../core/mobjects/View.js';
import { Mobject } from '../../../core/mobjects/Mobject.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
import { Rectangle } from '../../../core/shapes/Rectangle.js';
export class DesmosCalculator extends Linkable {
    defaults() {
        return {
            view: new View({
                div: document.createElement('div'),
                frameWidth: 800,
                frameHeight: 500
            }),
            screenEventHandler: ScreenEventHandler.Self,
            calculator: null,
            innerCanvas: new Mobject(),
            outerFrame: new Rectangle()
        };
    }
    setup() {
        super.setup();
        if (!getPaper().loadedAPIs.includes('desmos-calc')) {
            this.loadDesmosAPI();
        }
        this.innerCanvas.view.frame.update({
            width: this.view.frame.width,
            height: this.view.frame.height
        });
        this.innerCanvas.update({
            screenEventHandler: ScreenEventHandler.Auto
        });
        this.add(this.innerCanvas);
        this.innerCanvas.view.div.style['pointer-events'] = 'auto';
        this.innerCanvas.view.div.id = 'desmos-calc';
        this.outerFrame.update({
            width: this.view.frame.width,
            height: this.view.frame.height,
            screenEventHandler: ScreenEventHandler.Self
        });
        this.outerFrame.onPointerDown = (e) => {
            this.focus();
        };
        this.add(this.outerFrame);
        window.setTimeout(this.createCalculator.bind(this), 1000);
    }
    loadDesmosAPI() {
        let paper = getPaper();
        let scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = 'https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6';
        document.head.append(scriptTag);
        paper.loadedAPIs.push('desmos-calc');
    }
    createCalculator(options = {}) {
        this.calculator = Desmos.GraphingCalculator(this.innerCanvas.view.div, options);
    }
    focus() {
        super.focus();
        this.outerFrame.update({
            screenEventHandler: ScreenEventHandler.Below
        });
    }
    blur() {
        super.blur();
        this.outerFrame.update({
            screenEventHandler: ScreenEventHandler.Self
        });
    }
    setDragging(flag) {
        super.setDragging(flag);
        if (flag) {
            this.outerFrame.update({
                screenEventHandler: ScreenEventHandler.Parent
            });
        }
        else {
            this.outerFrame.update({
                screenEventHandler: ScreenEventHandler.Self
            });
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=DesmosCalculator.js.map