import { Mobject } from '../../../../core/mobjects/Mobject.js';
import { Color } from '../../../../core/classes/Color.js';
export class VisualSymbol extends Mobject {
    defaults() {
        return {
            MQ: null,
            MQObject: null,
            texString: '',
            fontSize: 28,
            span: document.createElement('span')
        };
    }
    setup() {
        super.setup();
        this.createMQObject();
    }
    createMQObject() {
        this.MQ = MathQuill.getInterface(2);
        this.span.style.color = 'white';
        this.span.style.fontSize = `${this.fontSize}px`;
        this.span.style.backgroundColor = Color.clear().toCSS();
        this.span.style.border = 'none';
        this.span.style.width = 'fit-content';
        this.span.style.cursor = 'inherit';
        this.MQObject = this.MQ.StaticMath(this.span);
        //this.update({ opacity: 0 })
        this.view.div.append(this.span);
        // conditionTrigger(this.fullyLoaded.bind(this), function() {
        // 	this.update({ opacity: 1 })
        // }.bind(this))
        this.update();
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['fontSize'] !== undefined) {
            this.span.style.fontSize = `${this.fontSize}px`;
        }
        if (this.MQObject) {
            this.MQObject.latex(this.texString);
            this.sizeToFit();
        }
    }
    fullyLoaded() {
        return this.MQObject.el().clientHeight > 0;
    }
    sizeToFit() {
        this.frameWidth = this.getWidth();
        this.frameHeight = this.getHeight();
        this.view.update({
            frameWidth: this.frameWidth,
            frameHeight: this.frameHeight
        });
    }
    getWidth() {
        return Math.max(this.MQObject.el().clientWidth, 20);
    }
    getHeight() {
        return Math.max(this.MQObject.el().clientHeight, 20);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VisualSymbol.js.map