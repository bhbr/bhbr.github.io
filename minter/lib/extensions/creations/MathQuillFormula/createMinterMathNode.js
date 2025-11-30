import { ParseError } from './ParseError.js';
import { typeToOperation } from './Token.js';
import { MinterSymbolNode, MinterConstantNode, MinterFunctionNode, MinterOperatorNode, MinterAssignmentNode } from './MinterMathNode.js';
/**
* Create the corresponding MathJS node of a Token and its children.
* @returns A newly constructed MathJS node.
*/
export function createMinterMathNode(token, children = []) {
    let fn = typeToOperation[token.type];
    switch (token.type) {
        case 4 /* TokenType.Minus */:
            // mathjs differentiates between subtraction and the unary minus
            fn = children.length === 1 ? 'unaryMinus' : fn;
        // falls through
        case 3 /* TokenType.Plus */:
            return new MinterOperatorNode((token.type == 3 /* TokenType.Plus */) ? '+' : '-', children);
        case 5 /* TokenType.Star */:
            return new MinterOperatorNode('*', children);
        case 18 /* TokenType.Frac */:
        case 7 /* TokenType.Slash */:
            return new MinterOperatorNode('/', children);
        case 8 /* TokenType.Caret */:
            if (children.length < 2) {
                throw new ParseError('Expected two children for ^ operator', token);
            }
            return new MinterOperatorNode('^', children);
        // mathjs built-in functions
        case 17 /* TokenType.Sqrt */:
        case 19 /* TokenType.Sin */:
        case 20 /* TokenType.Cos */:
        case 21 /* TokenType.Tan */:
        case 22 /* TokenType.Csc */:
        case 23 /* TokenType.Sec */:
        case 24 /* TokenType.Cot */:
        case 28 /* TokenType.Sinh */:
        case 29 /* TokenType.Cosh */:
        case 30 /* TokenType.Tanh */:
        case 25 /* TokenType.Arcsin */:
        case 26 /* TokenType.Arccos */:
        case 27 /* TokenType.Arctan */:
        case 31 /* TokenType.Log */:
        case 32 /* TokenType.Ln */:
            return new MinterFunctionNode(fn, children[0]);
        case 2 /* TokenType.Equals */:
            return new MinterAssignmentNode(children[0], children[1]);
        case 1 /* TokenType.Variable */:
            return new MinterSymbolNode(token.lexeme);
        case 0 /* TokenType.Number */:
            // convert string lexeme to number if posssible
            const constant = Number(token.lexeme);
            return new MinterConstantNode(constant);
        case 33 /* TokenType.Pi */:
            return new MinterSymbolNode('pi');
        case 34 /* TokenType.E */:
            return new MinterSymbolNode('e');
        default:
            throw new ParseError('unknown token type', token);
    }
}
// Maps each left grouping token to its corresponding right grouping token
export const rightGrouping = {
    [12 /* TokenType.Lparen */]: 13 /* TokenType.Rparen */,
    [10 /* TokenType.Lbrace */]: 11 /* TokenType.Rbrace */,
    [38 /* TokenType.Left */]: 39 /* TokenType.Right */,
    [14 /* TokenType.Bar */]: 14 /* TokenType.Bar */
};
// Token types that are primaries or denote the start of a primary
export const primaryTypes = [
    38 /* TokenType.Left */,
    12 /* TokenType.Lparen */,
    10 /* TokenType.Lbrace */,
    14 /* TokenType.Bar */,
    0 /* TokenType.Number */,
    1 /* TokenType.Variable */,
    18 /* TokenType.Frac */,
    17 /* TokenType.Sqrt */,
    19 /* TokenType.Sin */,
    20 /* TokenType.Cos */,
    21 /* TokenType.Tan */,
    22 /* TokenType.Csc */,
    23 /* TokenType.Sec */,
    24 /* TokenType.Cot */,
    25 /* TokenType.Arcsin */,
    26 /* TokenType.Arccos */,
    27 /* TokenType.Arctan */,
    28 /* TokenType.Sinh */,
    29 /* TokenType.Cosh */,
    30 /* TokenType.Tanh */,
    31 /* TokenType.Log */,
    32 /* TokenType.Ln */,
    42 /* TokenType.Det */,
    33 /* TokenType.Pi */,
    34 /* TokenType.E */,
    35 /* TokenType.Begin */,
    43 /* TokenType.Opname */
];
//# sourceMappingURL=createMinterMathNode.js.map