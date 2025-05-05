import { Mobject } from './Mobject.js';
import { TextLabelView } from './TextLabelView.js';
import { Color } from '../../core/classes/Color.js';
export class TextLabel extends Mobject {
    get textColor() { return this.view.color; }
    set textColor(newValue) { this.view.color = newValue; }
    get fontSize() { return this.view.fontSize; }
    set fontSize(newValue) { this.view.fontSize = newValue; }
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