import { Coin } from './Coin.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/ui/PlayButton/PlayButton.js';
import { TextLabel } from '../../../core/ui/TextLabel.js';
import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
import { HEADS_COLOR, TAILS_COLOR } from './constants.js';
import { NumberInputBox } from '../../../extensions/ui/InputBox/NumberInputBox.js';
import { getPaper } from '../../../core/functions/getters.js';
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
                //{ name: 'headsColor', displayName: 'heads color', type: 'Color' },
                //{ name: 'tailsColor', displayName: 'tails color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'nbHeads', displayName: '# heads', type: 'number' },
                { name: 'nbTails', displayName: '# tails', type: 'number' },
                { name: 'nbCoins', displayName: '# coins', type: 'number' },
                { name: 'mean', displayName: 'mean', type: 'number' }
            ],
            frameWidth: 300,
            frameHeight: 50,
            nbCoinsInputBox: new NumberInputBox({
                labelText: '# coins:',
                value: 1
            }),
        };
    }
    setup() {
        super.setup();
        this.createCoins();
        this.setupLabels();
        this.setupButton();
        this.setupInputBox();
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
        this.controls.add(this.playButton);
    }
    setupInputBox() {
        this.add(this.nbCoinsInputBox);
        this.nbCoinsInputBox.blur = this.endNbCoinsEditing.bind(this);
        this.nbCoinsInputBox.onReturn = this.endNbCoinsEditing.bind(this);
        this.controls.add(this.nbCoinsInputBox);
        this.nbCoinsInputBox.update({
            anchor: [this.frameWidth / 2 - this.nbCoinsInputBox.frameWidth / 2, 0]
        });
    }
    endNbCoinsEditing() {
        getPaper().blurFocusedChild();
        this.nbCoinsInputBox.inputElement.blur();
        document.removeEventListener('keydown', this.nbCoinsInputBox.boundKeyPressed);
        this.updateNbCoins(this.nbCoinsInputBox.value, false);
        this.updateDependents();
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
        this.positionNbCoinsInputBox();
        this.positionIOLists();
        this.updateDependents();
    }
    removeCoin() {
        let coin = this.coins.pop();
        this.remove(coin);
        this.adjustFrameWidth();
        this.positionTailsLabel();
        this.positionButton();
        this.positionNbCoinsInputBox();
        this.positionIOLists();
        this.updateDependents();
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
    positionNbCoinsInputBox() {
        this.nbCoinsInputBox.update({
            anchor: [
                this.frameWidth / 2 - this.nbCoinsInputBox.frameWidth / 2 - 25,
                -35
            ]
        });
    }
    flipCoins(nbFlips = 1) {
        for (let i = 0; i < nbFlips; i++) {
            for (let coin of this.coins) {
                coin.flip(false);
            }
            this.update({}, false);
            this.updateDependents();
        }
        this.update();
    }
    onTap(e) {
        this.flipCoins();
    }
    onLongPress(e) {
        this.flipCoins(100);
    }
    play() {
        this.playIntervalID = window.setInterval(function () {
            this.flipCoins();
        }.bind(this), 100);
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
    nbTailsAsString() {
        return this.nbTails().toString();
    }
    nbHeads() {
        let h = this.nbCoins - this.nbTails();
        return this.nbCoins - this.nbTails();
    }
    nbHeadsAsString() { return this.nbHeads().toString(); }
    mean() {
        return this.nbTails() / this.nbCoins;
    }
    update(args = {}, redraw = false) {
        let newNbCoins = args['nbCoins'];
        if (newNbCoins !== undefined && newNbCoins != this.nbCoins) {
            this.updateNbCoins(newNbCoins, true);
        }
        super.update(args, redraw);
    }
    updateNbCoins(newNbCoins, updateInputBox = false) {
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
        this.nbCoins = this.coins.length;
        this.updateDependents();
        if (updateInputBox) {
            this.nbCoinsInputBox.update({
                value: newNbCoins
            });
        }
    }
    computeWidth() {
        return (this.nbCoins - 1) * this.coinSpacing + 2 * this.coinRadius + this.nbHeadsLabel.frameWidth + this.nbTailsLabel.frameWidth;
    }
    addedInputLink(link) {
        super.addedInputLink(link);
        if (link.endHook.outlet.name == 'nbCoins') {
            this.nbCoinsInputBox.inputElement.disabled = true;
        }
    }
    removedInputLink(link) {
        super.removedInputLink(link);
        if (link.endHook.outlet.name == 'nbCoins') {
            this.nbCoinsInputBox.inputElement.disabled = false;
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=CoinRow.js.map