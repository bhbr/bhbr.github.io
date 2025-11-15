import { Mobject } from './Mobject.js';
import { TextLabelView } from './TextLabelView.js';
import { Color } from '../../core/classes/Color.js';
export class TextLabel extends Mobject {
    get textColor() { return this.view.color; }
    set textColor(newValue) { this.view.color = newValue; }
    get fontSize() { return this.view.fontSize; }
    set fontSize(newValue) { this.view.fontSize = newValue; }
    get horizontalAlign() { return this.view.horizontalAlign; }
    set horizontalAlign(newValue) { this.view.horizontalAlign = newValue; }
    get verticalAlign() { return this.view.verticalAlign; }
    set verticalAlign(newValue) { this.view.verticalAlign = newValue; }
    defaults() {
        return {
            text: 'text',
            textColor: Color.white(),
            view: new TextLabelView()
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=TextLabel.js.map