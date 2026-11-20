import { PlayPiece } from './PlayPiece.js';
import { FROG_SIZE } from '../constants.js';
import { ScreenEventHandler } from '@bhbr/minter';
import { vertexAdd, vertexSubtract, vertexIsCloseTo } from '@bhbr/affr2';
export class Frog extends PlayPiece {
    defaults() {
        return {
            color: 'green',
            frameWidth: FROG_SIZE,
            frameHeight: FROG_SIZE,
            position: [0, 0],
            startPosition: [0, 0],
            dragStartPoint: null,
            previousAnchor: null,
            screenEventHandler: ScreenEventHandler.Self,
            snappedPosition: null
        };
    }
    setup() {
        super.setup();
        this.update({
            imageLocation: `../assets/${this.color}_frog.png`
        });
    }
    update(args = {}, redraw = true) {
        if (args['color'] !== undefined) {
            args['imageLocation'] = `../assets/${args['color']}_frog.png`;
        }
        super.update(args, redraw);
    }
    startDragging(e) {
        if (!this.paper.playEnabled) {
            return;
        }
        this.update({
            dragStartPoint: vertexAdd(this.sensor.localEventVertex(e), this.anchor),
            previousAnchor: this.anchor
        });
        this.paper.startDraggingFrog(this);
    }
    dragging(e) {
        if (!this.paper.playEnabled) {
            return;
        }
        if (!this.dragStartPoint) {
            return;
        }
        let dragEndPoint = vertexAdd(this.sensor.localEventVertex(e), this.anchor);
        let dr = vertexSubtract(dragEndPoint, this.dragStartPoint);
        var newAnchor = vertexAdd(this.previousAnchor, dr);
        var newMidpoint = vertexAdd(newAnchor, [0.5 * this.frameWidth, 0.5 * this.frameHeight]);
        var snapped = false;
        for (let snapPoint of this.snapPoints) {
            if (vertexIsCloseTo(newMidpoint, snapPoint, 25)) {
                this.update({
                    anchor: vertexSubtract(snapPoint, [0.5 * this.frameWidth, 0.5 * this.frameHeight]),
                    snappedPosition: this.paper.positionForCoordinates(snapPoint)
                });
                snapped = true;
                break;
            }
        }
        if (!snapped) {
            this.update({
                snappedPosition: null,
                anchor: newAnchor
            });
        }
    }
    endDragging(e) {
        if (!this.paper.playEnabled) {
            return;
        }
        if (!this.dragStartPoint) {
            return;
        }
        if (this.snappedPosition) {
            this.paper.makeNewMove([
                this.position,
                this.snappedPosition
            ]);
        }
        else {
            this.update({
                anchor: this.previousAnchor
            });
        }
        this.update({
            dragStartPoint: null,
            previousAnchor: null,
            snapPoints: [],
            snappedPosition: null
        });
        this.paper.removeJumpLines();
        this.paper.removeGhostFrogs();
    }
}
//# sourceMappingURL=Frog.js.map