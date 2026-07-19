import { ExtendedObject } from '../../../../core/classes/ExtendedObject.js';
import { equalArrays } from '../../../../core/functions/arrays.js';
import { Lexer } from './Lexer.js';
import { Parser } from './Parser.js';
export class FormalLanguage extends ExtendedObject {
    constructor(args = {}) {
        super(args);
        this.parser.update({
            language: this
        });
    }
    defaults() {
        return {
            arities: {},
            syntaxRules: {},
            lexer: new Lexer(),
            parser: new Parser()
        };
    }
    terminalSymbols() {
        return Object.keys(this.arities);
    }
    nonterminalSymbols() {
        let symbols = Object.values(this.syntaxRules).map((x) => x[0]);
        return symbols;
    }
    isTerminalSymbol(x) {
        let flag = this.terminalSymbols().includes(x);
        return flag;
    }
    isNonterminalSymbol(x) {
        let flag = this.nonterminalSymbols().includes(x);
        return flag;
    }
    isSubsetNonterminal(symbol1, symbol2) {
        for (let rule of Object.values(this.syntaxRules)) {
            if (rule[0] == symbol2 && rule[1] == symbol1) {
                return true;
            }
        }
        return false;
    }
    isNonterminalVariableSymbol(x) {
        if (typeof x !== 'string') {
            return false;
        }
        let y = x;
        let leftPart = y.split('-')[0];
        let rightPart = y.split('-')[1];
        let expressionName = leftPart.slice(1);
        let index = rightPart.slice(0, rightPart.length - 1);
        if (`<${expressionName}-${index}>` !== y) {
            return false;
        }
        let flag = this.isNonterminalSymbol(`<${expressionName}>`);
        return flag;
    }
    arity(str) {
        return this.arities[str];
    }
    ///////////
    // LEXER //
    ///////////
    lex(str) {
        return this.lexer.stringToSentence(str);
    }
    ////////////
    // PARSER //
    ////////////
    parse(sent) {
        return this.parser.sentenceToTree(sent);
    }
    // treeToTex(tree: SentenceTree): string {
    // 	let symbol = tree[0]
    // 	let children = tree[1]
    // 	if (children.length == 0) {
    // 		return symbol
    // 	} else if (children.length == 1) {
    // 		if (symbol == '\\sqrt') {
    // 			return `${symbol}{${this.treeToTex(children[0])}}`;
    // 		}
    // 		return `${symbol}(${this.treeToTex(children[0])})`;
    // 	} else if (children.length == 2) {
    // 		if (symbol == '\\frac') {
    // 		return `${symbol}{${this.treeToTex(children[0])}}{${this.treeToTex(children[1])}}`;				
    // 		}
    // 		return `(${this.treeToTex(children[0])} ${symbol} ${this.treeToTex(children[1])})`;
    // 	} else {
    // 		throw 'Unknown number of arguments'
    // 	}
    // }
    nonterminal(form) {
        if (typeof form == 'string') {
            let leftPart = form.split('-')[0];
            return (leftPart + '>');
        }
        for (let [name, content] of Object.values(this.syntaxRules)) {
            if (form[0] == content[0]) {
                return name;
            }
        }
        return null;
    }
    matchSentenceTreeForm(form, tree, record = {}) {
        // A (term) form is a tree with variables in it
        // (symbols <expr-1>, <expr-2>). This function returns
        // a dictionary of what subtrees have been matched
        // to the variables:
        // { '<a>': subtree1, '<b>': subtree2, ... }
        if (equalArrays(tree, form)) {
            return record;
        }
        if (record === null) {
            return null;
        }
        let name1 = this.nonterminal(form);
        let name2 = this.nonterminal(tree);
        if (name1 !== name2 && !this.isSubsetNonterminal(name2, name1)) {
            return null;
        }
        if (this.isNonterminalVariableSymbol(form)) {
            let existingMatch = record[form];
            if (existingMatch === undefined) {
                record[form] = tree;
                return record;
            }
            else if (equalArrays(existingMatch, tree)) {
                return record;
            }
            else {
                return null;
            }
        }
        let formTopSymbol = form[0];
        let treeTopSymbol = tree[0];
        if (formTopSymbol !== treeTopSymbol) {
            return null;
        }
        let formArgs = form[1];
        let treeArgs = tree[1];
        for (let i = 0; i < treeArgs.length; i++) {
            record = this.matchSentenceTreeForm(formArgs[i], treeArgs[i], record);
        }
        return record;
    }
    insert(values, form) {
        if (this.isNonterminalVariableSymbol(form)) {
            return values[form];
        }
        let sentenceArgs = form[1];
        let newArgs = [];
        for (let i = 0; i < sentenceArgs.length; i++) {
            let node = sentenceArgs[i];
            newArgs.push(this.insert(values, node));
        }
        return [form[0], newArgs];
    }
    clone(form) {
        if (this.isNonterminalSymbol(form)) {
            return `${form}`;
        }
        let ret = [form[0], form[1]];
        return ret;
    }
    treeContainsSubtree(tree, subtree) {
        // array identity is relevant
        if (tree === subtree) {
            return true;
        }
        for (let child of tree[1]) {
            if (this.treeContainsSubtree(child, subtree)) {
                return true;
            }
        }
        return false;
    }
    replaceSubtreeInTree(tree, subtree, newSubtree) {
        if (tree === subtree) {
            return this.clone(newSubtree);
        }
        for (let i = 0; i < tree[1].length; i++) {
            let child = tree[1][i];
            if (child === subtree) {
                return [tree[0], tree[1].with(i, newSubtree)];
            }
            if (this.treeContainsSubtree(child, subtree)) {
                return [tree[0], tree[1].with(i, this.replaceSubtreeInTree(child, subtree, newSubtree))];
            }
        }
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=FormalLanguage.js.map