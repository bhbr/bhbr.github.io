import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/mobjects/PlayButton/PlayButton.js';
import { SimpleButton } from '../../../core/mobjects/SimpleButton.js';
import { Color } from '../../../core/classes/Color.js';
import { TextLabel } from '../../../core/mobjects/TextLabel.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
export class CoinRow extends Linkable {
    defaults() {
        return {
            coins: [],
            coinRadius: 25,
            nbCoins: 12,
            coinSpacing: 16,
            headsColor: new Color(0, 0.3, 1),
            tailsColor: Color.red(),
            tailsProbability: 0.5,
            playState: 'stop',
            playIntervalID: null,
            playButton: new PlayButton(),
            resetButton: new SimpleButton({
                text: 'reset'
            }),
            nbHeadsLabel: new TextLabel({
                frameWidth: 50,
                frameHeight: 25
            }),
            nbTailsLabel: new TextLabel({
                frameWidth: 50,
                frameHeight: 25
            }),
            nbHeadsHistory: [],
            nbTailsHistory: [],
            inputProperties: [
                { name: 'tailsProbability', displayName: 'p(tails)', type: 'number' },
                { name: 'nbCoins', displayName: '# coins', type: 'number' },
                { name: 'headsColor', displayName: 'heads color', type: 'Color' },
                { name: 'tailsColor', displayName: 'tails color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'nbHeads', displayName: '# heads', type: 'number' },
                { name: 'nbTails', displayName: '# tails', type: 'number' }
            ],
            frameWidth: 300,
            frameHeight: 100
        };
    }
    setup() {
        super.setup();
        this.createCoins();
        this.setupLabels();
        this.setupButtons();
    }
    createCoins() {
        for (var i = 0; i < this.nbCoins; i++) {
            this.addCoin();
        }
    }
    setupLabels() {
        this.nbHeadsLabel.update({
            textColor: this.headsColor,
            fontSize: 24,
            anchor: [0, this.coinRadius - this.nbHeadsLabel.frameHeight / 2]
        });
        this.addDependency('nbHeadsAsString', this.nbHeadsLabel, 'text');
        this.add(this.nbHeadsLabel);
        this.nbTailsLabel.update({
            textColor: this.tailsColor,
            fontSize: 24
        });
        this.addDependency('nbTailsAsString', this.nbTailsLabel, 'text');
        this.add(this.nbTailsLabel);
        this.positionTailsLabel();
    }
    setupButtons() {
        this.add(this.playButton);
        this.add(this.resetButton);
        this.positionButtons();
        this.playButton.update({
            mobject: this
        });
        this.resetButton.action = this.reset.bind(this);
    }
    addCoin() {
        let coin = new Coin({
            midpoint: [
                this.nbHeadsLabel.frameWidth + this.coinSpacing * this.coins.length + this.coinRadius,
                this.coinRadius
            ],
            radius: this.coinRadius,
            headsColor: this.headsColor,
            tailsColor: this.tailsColor,
            tailsProbability: this.tailsProbability,
            screenEventHandler: ScreenEventHandler.Parent
        });
        this.addDependency('headsColor', coin, 'headsColor');
        this.addDependency('tailsColor', coin, 'tailsColor');
        this.addDependency('tailsProbability', coin, 'tailsProbability');
        this.coins.push(coin);
        this.add(coin);
        this.adjustFrameWidth();
        this.positionTailsLabel();
        this.positionButtons();
    }
    removeCoin() {
        let coin = this.coins.pop();
        this.remove(coin);
        this.adjustFrameWidth();
        this.positionTailsLabel();
        this.positionButtons();
    }
    adjustFrameWidth() {
        this.update({
            frameWidth: 2 * this.nbHeadsLabel.frameWidth + 2 * this.coinRadius + (this.coins.length - 1) * this.coinSpacing
        });
    }
    positionTailsLabel() {
        this.nbTailsLabel.update({
            anchor: [
                this.nbTailsLabel.frameWidth + (this.coins.length - 1) * this.coinSpacing + 2 * this.coinRadius,
                this.coinRadius - this.nbHeadsLabel.frameHeight / 2
            ]
        });
    }
    positionButtons() {
        this.playButton.update({
            anchor: [
                this.frameWidth / 2 - this.playButton.frameWidth - 5,
                2 * this.coinRadius + 5
            ]
        });
        this.resetButton.update({
            anchor: [
                this.frameWidth / 2 + 5,
                2 * this.coinRadius + 5
            ]
        });
    }
    flipCoins() {
        for (let coin of this.coins) {
            coin.flip();
        }
        this.nbHeadsHistory.push(this.nbHeads());
        this.nbTailsHistory.push(this.nbTails());
        this.update(); // to trigger the histogram to update
    }
    play() {
        this.playIntervalID = window.setInterval(this.flipCoins.bind(this), 100);
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
        this.nbHeadsHistory = [];
        this.nbTailsHistory = [];
        this.update();
    }
    nbFlips() { return this.nbTailsHistory.length; }
    nbTails() {
        var t = 0;
        for (let coin of this.coins) {
            t += coin.value;
        }
        return t;
    }
    nbTailsAsString() { return this.nbTails().toString(); }
    nbHeads() { return this.nbCoins - this.nbTails(); }
    nbHeadsAsString() { return this.nbHeads().toString(); }
    update(args = {}, redraw = false) {
        let newNbCoins = args['nbCoins'];
        if (newNbCoins !== undefined && newNbCoins != this.nbCoins) {
            this.updateNbCoins(newNbCoins);
        }
        super.update(args, redraw);
    }
    updateNbCoins(newNbCoins) {
        if (newNbCoins < this.nbCoins) {
            for (var i = this.nbCoins - 1; i >= newNbCoins; i--) {
                this.removeCoin();
            }
        }
        else {
            for (var i = this.nbCoins; i < newNbCoins; i++) {
                this.addCoin();
            }
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinRow.js.map