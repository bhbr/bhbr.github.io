import { Algebra } from '../model/Algebra.js';
import { VisualNumber } from './VisualNumber.js';
import { VisualVariable } from './VisualVariable.js';
import { VisualGroup } from './VisualGroup.js';
import { VisualFunction } from './VisualFunction.js';
import { VisualOperator } from './VisualOperator.js';
import { VisualEquation } from './VisualEquation.js';
import { VisualFraction } from './VisualFraction.js';
import { ExtendedObject } from '../../../../core/classes/ExtendedObject.js';
import { deepCopy } from '../../../../core/functions/copying.js';
export class VisualFormulaMaker extends ExtendedObject {
    defaults() {
        return {
            algebra: new Algebra()
        };
    }
    treeToVisual(tree, location = []) {
        let symbol = tree[0];
        if (this.algebra.lexer.isNumber(symbol)) {
            return new VisualNumber({
                value: Number(symbol),
                formulaTree: tree,
                location: deepCopy(location)
            });
        }
        if (this.algebra.lexer.isLetter(symbol)) {
            return new VisualVariable({
                name: symbol,
                formulaTree: tree,
                location: deepCopy(location)
            });
        }
        if (this.algebra.lexer.isFunctionToken(symbol)) {
            let child = tree[1][0];
            return new VisualFunction({
                name: symbol,
                child: this.treeToVisual(child, location.concat([0])),
                formulaTree: tree,
                location: deepCopy(location)
            });
        }
        if (symbol == '\\frac') {
            let numerator = tree[1][0];
            let denominator = tree[1][1];
            return new VisualFraction({
                numerator: this.treeToVisual(numerator, location.concat([0])),
                denominator: this.treeToVisual(denominator, location.concat([1])),
                formulaTree: tree,
                location: deepCopy(location)
            });
        }
        if (this.algebra.parser.isOperator(symbol)) {
            let child1 = tree[1][0];
            let child2 = tree[1][1];
            if (symbol == '=') {
                return new VisualEquation({
                    child1: this.treeToVisual(child1, location.concat([0])),
                    child2: this.treeToVisual(child2, location.concat([1])),
                    formulaTree: tree,
                    location: deepCopy(location)
                });
            }
            else {
                return new VisualOperator({
                    operator: symbol,
                    child1: this.treeToVisual(child1, location.concat([0])),
                    child2: this.treeToVisual(child2, location.concat([1])),
                    formulaTree: tree,
                    location: deepCopy(location)
                });
            }
        }
        if (this.algebra.parser.isOpenParen((symbol))) {
            let child = tree[1][0];
            return new VisualGroup({
                parenType: symbol,
                child: this.treeToVisual(child, location.concat([0])),
                formulaTree: tree,
                location: deepCopy(location),
                parser: this.algebra.parser
            });
        }
        return null;
    }
    sentenceToVisual(sentence) {
        if (sentence.length == 0) {
            return null;
        }
        let tree = this.algebra.parser.sentenceToTree(sentence);
        let formula = this.treeToVisual(tree);
        return formula;
    }
    texToVisual(tex) {
        if (tex.trim() == '') {
            return null;
        }
        let tree = this.algebra.parser.stringToTree(tex);
        let formula = this.treeToVisual(tree);
        return formula;
    }
    texToVisual2(tex) {
        if (tex.trim() == '') {
            return null;
        }
        let sentence = this.algebra.lexer.stringToSentence(tex);
        let tree = this.sentenceToVisual(sentence);
        return tree;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=VisualFormulaMaker.js.map