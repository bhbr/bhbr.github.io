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
                anchor: [-12.5, 50]
            }),
            valueHistory: [],
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
            tailsProbability: this.tailsProbability
        }, false);
        this.add(this.coin);
        this.add(this.playButton);
        this.playButton.mobject = this;
    }
    onTap(e) {
        this.flip();
    }
    flip() {
        this.coin.flip();
        this.update();
        this.updateDependents();
    }
    play() {
        this.playIntervalID = window.setInterval(this.flip.bind(this), 250);
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