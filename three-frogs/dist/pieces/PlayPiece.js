import { Mobject, ImageView } from '@bhbr/minter';
import { vertexSubtract } from '@bhbr/affr2';
export class PlayPiece extends Mobject {
    defaults() {
        return {
            view: new ImageView(),
            position: [0, 0],
            paper: null
        };
    }
    get imageLocation() {
        return this.view.imageLocation;
    }
    set imageLocation(newValue) {
        this.view.update({
            imageLocation: newValue
        });
    }
    placeAt(v) {
        this.update({
            anchor: vertexSubtract(v, [0.5 * this.frameWidth, 0.5 * this.frameHeight]),
            position: this.paper.positionForCoordinates(v)
        });
    }
    positionAt(pos) {
        if (this.paper === null) {
            return;
        }
        this.update({
            anchor: vertexSubtract(this.paper.coordinatesForPosition(pos), [0.5 * this.frameWidth, 0.5 * this.frameHeight]),
            position: pos
        });
    }
}
//# sourceMappingURL=PlayPiece.js.map