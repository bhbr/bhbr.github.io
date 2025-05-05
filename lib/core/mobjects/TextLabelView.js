import { View } from './View.js';
import { Color } from '../../core/classes/Color.js';
export class TextLabelView extends View {
    defaults() {
        return {
            horizontalAlign: 'center',
            verticalAlign: 'center',
            color: Color.white(),
            borderColor: Color.white(),
            borderWidth: 1,
            fontSize: 16,
            fontFamily: 'Helvetica'
        };
    }
    setup() {
        super.setup();
        this.div.setAttribute('class', this.mobject.constructor.name + ' unselectable mobject-div');
        this.div.style.display = 'flex';
        this.div.style.fontFamily = this.fontFamily;
        this.div.style.fontSize = `${this.fontSize}px`;
    }
    redraw() {
        super.redraw();
        //// internal dependencies
        this.div.innerHTML = this.mobject.text;
        this.div.style.color = (this.color ?? Color.white()).toHex();
        this.div.style.borderColor = (this.borderColor ?? Color.white()).toHex();
        this.div.style.borderWidth = `${this.borderWidth}px`;
        this.div.style.fontSize = `${this.fontSize}px`;
        switch (this.verticalAlign) {
            case 'top':
                this.div.style.alignItems = 'flex-start';
                break;
            case 'center':
                this.div.style.alignItems = 'center';
                break;
            case 'bottom':
                this.div.style.alignItems = 'flex-end';
                break;
        }
        switch (this.horizontalAlign) {
            case 'left':
                this.div.style.justifyContent = 'flex-start';
                break;
            case 'center':
                this.div.style.justifyContent = 'center';
                break;
            case 'right':
                this.div.style.justifyContent = 'flex-end';
                break;
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=TextLabelView.js.map