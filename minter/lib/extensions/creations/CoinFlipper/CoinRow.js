import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/mobjects/PlayButton/PlayButton.js';
import { TextLabel } from '../../../core/mobjects/TextLabel.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
import { HEADS_COLOR, TAILS_COLOR } from './constants.js';
export class CoinRow extends Linkable {
    defaults() {
        return {
            coins: [],
            coinRadius: 25,
            nbCoins: 12,
            coinSpacing: 16,
            headsColor: HEADS_COLOR,
            tailsColor: TAILS_COLOR,
            tailsProbability: 0.5,
            playState: 'stop',
            playIntervalID: null,
            playButton: new PlayButton({
                anchor: [0, 50]
            }),
            nbHeadsLabel: new TextLabel({
                frameWidth: 50,
                frameHeight: 25
            }),
            nbTailsLabel: new TextLabel({
                frameWidth: 50,
                frameHeight: 25
            }),
            inputProperties: [
                { name: 'tailsProbability', displayName: 'p(tails)', type: 'number' },
                { name: 'nbCoins', displayName: '# coins', type: 'number' },
                { name: 'headsColor', displayName: 'heads color', type: 'Color' },
                { name: 'tailsColor', displayName: 'tails color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'nbHeads', displayName: '# heads', type: 'number' },
                { name: 'nbTails', displayName: '# tails', type: 'number' },
                { name: 'mean', displayName: 'mean', type: 'number' }
            ],
            frameWidth: 300,
            frameHeight: 50
        };
    }
    setup() {
        super.setup();
        this.createCoins();
        this.setupLabels();
        this.setupButton();
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
    setupButton() {
        this.add(this.playButton);
        this.positionButton();
        this.playButton.update({
            mobject: this
        });
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
        this.positionButton();
    }
    removeCoin() {
        let coin = this.coins.pop();
        this.remove(coin);
        this.adjustFrameWidth();
        this.positionTailsLabel();
        this.positionButton();
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
    positionButton() {
        this.playButton.update({
            anchor: [
                this.frameWidth / 2 - this.playButton.frameWidth / 2,
                2 * this.coinRadius + 15
            ]
        });
    }
    flipCoins() {
        for (let coin of this.coins) {
            coin.flip();
        }
        this.update();
        this.updateDependents();
    }
    onTap(e) {
        this.flipCoins();
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
    mean() {
        return this.nbTails() / this.nbCoins;
    }
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
    computeWidth() {
        return (this.nbCoins - 1) * this.coinSpacing + 2 * this.coinRadius + this.nbHeadsLabel.frameWidth + this.nbTailsLabel.frameWidth;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinRow.js.map