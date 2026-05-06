import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/ui/PlayButton/PlayButton.js';
export class PlayableCoin extends Linkable {
    defaults() {
        return {
            coin: new Coin(),
            playState: 'stop',
            playIntervalID: null,
            playButton: new PlayButton({
                anchor: [0, 70]
            }),
            valueHistory: [],
            inputProperties: [
                { name: 'tailsProbability', displayName: 'p(tails)', type: 'number' },
                //{ name: 'headsColor', displayName: 'heads color', type: 'Color' },
                //{ name: 'tailsColor', displayName: 'tails color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'value', type: 'number' },
            ],
            frameWidth: 50,
            frameHeight: 50,
            swipedSide: null
        };
    }
    get tailsProbability() {
        return this.coin.tailsProbability;
    }
    set tailsProbability(newValue) {
        this.coin.tailsProbability = newValue;
    }
    setup() {
        super.setup();
        this.update({
            frameWidth: 2 * this.coin.radius,
            frameHeight: 2 * this.coin.radius
        });
        this.coin.update({
            midpoint: [this.coin.radius, this.coin.radius],
            tailsProbability: this.tailsProbability
        });
        this.add(this.coin);
        //this.add(this.playButton)
        this.controls.add(this.playButton);
        this.playButton.mobject = this;
    }
    onTap(e) {
        this.flip();
        this.coin.update({
            opacity: 1
        });
    }
    onLongPress(e) {
        this.flip(true, 100);
        this.coin.update({
            opacity: 1
        });
    }
    onPointerDown(e) {
        this.sensor.eventStartLocation = this.sensor.localEventVertex(e);
        this.coin.update({
            opacity: 0.5
        });
    }
    onPointerMove(e) {
        if (this.sensor.eventStartLocation === null) {
            return;
        }
        let dx = this.sensor.localEventVertex(e)[0] - this.sensor.eventStartLocation[0];
        if (dx > 10) {
            this.swipedSide = 'tails';
        }
        else if (dx < -10) {
            this.swipedSide = 'heads';
        }
    }
    onPointerUp(e) {
        this.coin.update({
            opacity: 1
        });
        if (this.swipedSide) {
            this.coin.flipToState(this.swipedSide, true);
            this.update();
            this.updateDependents();
            this.swipedSide = null;
        }
    }
    flip(animate = false, nbFlips = 1) {
        for (let i = 0; i < nbFlips; i++) {
            var an = (i == nbFlips - 1);
            this.coin.flip(animate && an);
            this.update({}, an);
            this.updateDependents();
        }
    }
    play() {
        this.playIntervalID = window.setInterval(function () {
            this.flip(true);
        }.bind(this), 250);
        this.playState = 'play';
    }
    pause() {
        window.clearInterval(this.playIntervalID);
        this.playState = 'stop';
    }
    togglePlayState() {
        if (this.playState == 'play') {
            this.pause();
        }
        else {
            this.play();
        }
    }
    get value() { return this.coin.value; }
    set value(newValue) { this.coin.value = newValue; }
    update(args = {}, redraw = true) {
        let p = args['tailsProbability'];
        if (p !== undefined) {
            this.coin.update({
                tailsProbability: p
            }, true);
        }
        super.update(args, redraw);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoin.js.map