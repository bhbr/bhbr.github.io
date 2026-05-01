import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class PlotButton extends CreativeButton {
    defaults() {
        return {
            creations: ['plot', 'histogram'],
            iconSize: 28
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=PlotButton.js.map