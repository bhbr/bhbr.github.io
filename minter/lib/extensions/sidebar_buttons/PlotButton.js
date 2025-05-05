import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class PlotButton extends CreativeButton {
    defaults() {
        return {
            creations: ['plot', 'hist']
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=PlotButton.js.map