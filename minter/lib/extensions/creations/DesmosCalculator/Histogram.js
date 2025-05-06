import { DesmosCalculator } from '../../../extensions/creations/DesmosCalculator/DesmosCalculator.js';
import { Color } from '../../../core/classes/Color.js';
export class Histogram extends DesmosCalculator {
    defaults() {
        return {
            nbBins: 0,
            data: [],
            leftColor: Color.green(),
            rightColor: Color.purple(),
            inputProperties: [
                { name: 'data', displayName: null, type: 'Array<number>' },
                { name: 'nbBins', displayName: '# bins', type: 'number' },
                { name: 'leftColor', displayName: 'left color', type: 'Color' },
                { name: 'rightColor', displayName: 'right color', type: 'Color' }
            ],
            outputProperties: [
                { name: 'bins', type: 'Array<number>' }
            ]
        };
    }
    createCalculator(options = {}) {
        options['expressions'] = false;
        super.createCalculator(options);
        this.calculator.setExpression({ id: 'B', latex: `B=[${this.bins()}]` });
        this.calculator.setMathBounds({
            left: -1,
            right: this.nbBins + 1,
            bottom: -1,
            top: 10
        });
    }
    sampleSize() {
        return this.data.length;
    }
    bins() {
        let bins = [];
        for (var i = 0; i < this.nbBins; i++) {
            bins.push(0);
        }
        for (var n of this.data) {
            bins[n]++;
        }
        return bins;
    }
    createBars() {
        for (var i = 0; i < this.nbBins; i++) {
            let color = this.leftColor.interpolate(this.rightColor, i / this.nbBins);
            let latex = `0\\leq y\\leq \\{ ${i}\\leq x < ${i + 1}: B[${i + 1}]\\}`;
            this.calculator.setExpression({
                id: `bar-${i}`,
                latex: latex,
                color: color.toHex()
            });
        }
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        if (args['data'] !== undefined) {
            this.calculator.setExpression({ id: 'B', latex: `B=[${this.bins()}]` });
            this.createBars();
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Histogram.js.map