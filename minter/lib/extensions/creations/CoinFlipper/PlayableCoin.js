import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/mobjects/PlayButton/PlayButton.js';
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
                { name: 'headsColor', displayName: 'heads color', type: 'Color' },
                { name: 'tailsColor', displayName: 'tails color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'value', type: 'number' }
            ],
            frameWidth: 50,
            frameHeight: 80,
            tailsProbability: 0.5
        };
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
        this.add(this.playButton);
        this.playButton.mobject = this;
    }
    onTap(e) {
        this.flip(true);
    }
    flip(animate = false) {
        this.coin.flip(animate);
        this.update();
        this.updateDependents();
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
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoin.js.map