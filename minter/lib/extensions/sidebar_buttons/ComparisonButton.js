import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class ComparisonButton extends CreativeButton {
    defaults() {
        return {
            creations: ['less than', 'less or equal', 'greater than', 'greater or equal', 'equal', 'not equal'],
            icon: new ImageView({
                imageLocation: '../../assets/less_than.png',
                frameWidth: 25,
                frameHeight: 25
            })
        };
    }
    mutabilities() {
        return {
            creations: 'never'
        };
    }
}
//# sourceMappingURL=ComparisonButton.js.map