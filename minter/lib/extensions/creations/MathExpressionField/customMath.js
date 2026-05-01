export class MathWrapper {
    constructor() {
        // use BigNumber to reduce floating-point rounding errors
        this.math = create(all, {
            number: 'BigNumber',
            precision: 64,
        }); //MathJsInstance
        // for more conversions, visit https://github.com/josdejong/mathjs/blob/master/src/core/function/typed.js#L167
        this.math.typed.clearConversions()(this.math.typed).addConversions([
            {
                from: 'number',
                to: 'BigNumber',
                convert: function (x) {
                    return this.math.bignumber(x);
                },
            },
            {
                from: 'string',
                to: 'BigNumber',
                convert: function (x) {
                    try {
                        return this.math.bignumber(x);
                    }
                    catch (err) {
                        throw new Error('Cannot convert "' + x + '" to BigNumber');
                    }
                },
            },
        ]);
        // Additional functions to be passed to the scope of math.evaluate(scope)
        // (not defined in mathjs)
        this.mathImport = {
            lastFn: '',
            lastArgs: [],
            eigenvalues: (matrix) => this.math.eigs(matrix).values,
            eigenvectors: (matrix) => this.math.eigs(matrix).eigenvectors,
            comp: (a, b) => this.math.divide(this.math.dot(a, b), this.math.norm(a)), // component of b along a
            proj: (a, b) => this.math.multiply(this.math.divide(a, this.math.norm(a)), this.math.divide(this.math.dot(a, b), this.math.norm(a))), // projection of b along a
        };
        this.math.import(this.mathImport, {
            override: true
        });
        // hacky way to disable unit parsing
        // https://github.com/josdejong/mathjs/issues/1220
        this.units = this.math.Unit.UNITS;
        Object.keys(this.units).forEach((unit) => { delete this.units[unit]; });
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=customMath.js.map