import { SidebarButton } from './SidebarButton.js';
import { Color } from '../../core/classes/Color.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class RestartButton extends SidebarButton {
    defaults() {
        return {
            baseColor: Color.red().brighten(0.5),
            messageKey: 'clear strokes',
            touchDownMessages: [
                { 'clear strokes': false },
                { 'restart': false }
            ],
            touchUpMessages: [
                { 'clear strokes': true },
                { 'restart': true }
            ],
            icon: new ImageView({
                imageLocation: '../../assets/clear_strokes.png',
                frameWidth: 30,
                frameHeight: 30
            })
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=RestartButton.js.map