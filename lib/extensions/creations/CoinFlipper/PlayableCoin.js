import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/mobjects/PlayButton/PlayButton.js';
import { SimpleButton } from '../../../core/mobjects/SimpleButton.js';
export class PlayableCoin extends Linkable {
    defaults() {
        return {
            coin: new Coin(),
            playState: 'stop',
            playIntervalID: null,
            playButton: new PlayButton({
                anchor: [-25, 50]
            }),
            resetButton: new SimpleButton({
                anchor: [10, 50],
                text: 'reset'
            }),
            valueHistory: [],
            outputProperties: [
                { name: 'value', type: 'number' },
                { name: 'valueHistory', type: 'Array<number>' },
                { name: 'nbFlips', type: 'number' },
                { name: 'nbHeads', type: 'number' },
                { name: 'nbTails', type: 'number' }
            ],
            frameWidth: 50,
            frameHeight: 80,
            tailsProbability: 0.5
        };
    }
    setup() {
        super.setup();
        this.coin.update({
            tailsProbability: this.tailsProbability
        }, false);
        this.add(this.coin);
        this.add(this.playButton);
        this.add(this.resetButton);
        this.playButton.mobject = this;
        this.resetButton.action = this.reset.bind(this);
    }
    onTap(e) {
        this.flip();
    }
    flip() {
        this.coin.flip();
        this.valueHistory.push(this.value);
        this.update();
    }
    play() {
        this.playIntervalID = window.setInterval(this.flip.bind(this), 250);
        this.playState = 'play';
    }
    pause() {
        window.clearInterval(this.playIntervalID);
        this.playState = 'pause';
    }
    togglePlayState() {
        if (this.playState == 'play') {
            this.pause();
        }
        else {
            this.play();
        }
    }
    reset() {
        this.pause();
        this.playButton.toggleLabel();
        this.valueHistory = [];
        this.update();
    }
    get value() { return this.coin.value; }
    set value(newValue) { this.coin.value = newValue; }
    nbFlips() { return this.valueHistory.length; }
    nbHeads() {
        var sum = 0;
        for (let value of this.valueHistory) {
            sum += value;
        }
        return sum;
    }
    nbTails() { return this.nbFlips() - this.nbHeads(); }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PlayableCoin.js.map