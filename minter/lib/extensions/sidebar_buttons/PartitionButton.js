import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
export class PartitionButton extends CreativeButton {
    defaults() {
        return {
            creations: ['partition', 'wall'],
            iconSize: 35
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=PartitionButton.js.map