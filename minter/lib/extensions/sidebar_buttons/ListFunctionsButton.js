import { CreativeButton } from '../../core/sidebar_buttons/CreativeButton.js';
import { ImageView } from '../../core/mobjects/ImageView.js';
export class ListFunctionsButton extends CreativeButton {
    defaults() {
        return {
            creations: ['sum', 'mean'],
            icon: new ImageView({
                imageLocation: '../../assets/sum.png',
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
//# sourceMappingURL=ListFunctionsButton.js.map