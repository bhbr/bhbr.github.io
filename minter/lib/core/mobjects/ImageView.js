import { View } from '../../core/mobjects/View.js';
export class ImageView extends View {
    defaults() {
        return {
            imageLocation: null,
            imageElement: document.createElement('img')
        };
    }
    setup() {
        super.setup();
        this.div.appendChild(this.imageElement);
        this.imageElement.src = this.imageLocation;
    }
    redraw() {
        super.redraw();
        this.imageElement.width = this.frameWidth;
        this.imageElement.height = this.frameHeight;
    }
    update(args = {}) {
        super.update(args);
        let newImageLocation = args['imageLocation'];
        if (newImageLocation) {
            this.imageElement.src = newImageLocation;
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ImageView.js.map