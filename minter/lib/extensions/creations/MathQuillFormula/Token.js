export const lexemeToType = {
    '=': 2 /* TokenType.Equals */,
    '+': 3 /* TokenType.Plus */,
    '-': 4 /* TokenType.Minus */,
    '*': 5 /* TokenType.Star */,
    '\\cdot': 5 /* TokenType.Star */,
    '\\times': 6 /* TokenType.Times */,
    '^': 8 /* TokenType.Caret */,
    '/': 7 /* TokenType.Slash */,
    ',': 9 /* TokenType.Comma */,
    '{': 10 /* TokenType.Lbrace */,
    '}': 11 /* TokenType.Rbrace */,
    '(': 12 /* TokenType.Lparen */,
    ')': 13 /* TokenType.Rparen */,
    '|': 14 /* TokenType.Bar */,
    '&': 15 /* TokenType.Amp */,
    bmatrix: 37 /* TokenType.Matrix */,
    '\\\\': 16 /* TokenType.Dblbackslash */,
    '\\sqrt': 17 /* TokenType.Sqrt */,
    '\\frac': 18 /* TokenType.Frac */,
    '\\sin': 19 /* TokenType.Sin */,
    '\\cos': 20 /* TokenType.Cos */,
    '\\tan': 21 /* TokenType.Tan */,
    '\\csc': 22 /* TokenType.Csc */,
    '\\sec': 23 /* TokenType.Sec */,
    '\\cot': 24 /* TokenType.Cot */,
    '\\arcsin': 25 /* TokenType.Arcsin */,
    '\\arccos': 26 /* TokenType.Arccos */,
    '\\arctan': 27 /* TokenType.Arctan */,
    '\\sinh': 28 /* TokenType.Sinh */,
    '\\cosh': 29 /* TokenType.Cosh */,
    '\\tanh': 30 /* TokenType.Tanh */,
    '\\log': 31 /* TokenType.Log */,
    '\\ln': 32 /* TokenType.Ln */,
    '\\pi': 33 /* TokenType.Pi */,
    e: 34 /* TokenType.E */,
    '\\begin': 35 /* TokenType.Begin */,
    '\\end': 36 /* TokenType.End */,
    '\\left': 38 /* TokenType.Left */,
    '\\right': 39 /* TokenType.Right */,
    T: 41 /* TokenType.T */,
    '\\det': 42 /* TokenType.Det */,
    '\\operatorname': 43 /* TokenType.Opname */,
    eigenvectors: 45 /* TokenType.Eigenvectors */,
    eigenvalues: 44 /* TokenType.Eigenvalues */,
    cross: 46 /* TokenType.Cross */,
    proj: 47 /* TokenType.Proj */,
    comp: 48 /* TokenType.Comp */,
    norm: 49 /* TokenType.Norm */,
    inv: 50 /* TokenType.Inv */,
};
/**
* A mapping from a token type to the operation it represents.
* The operation is the name of a function in the mathjs namespace,
* or of a function to be defined in scope (i.e. in the argument to math.evaluate())
*/
export const typeToOperation = {
    [3 /* TokenType.Plus */]: 'add',
    [4 /* TokenType.Minus */]: 'subtract',
    [5 /* TokenType.Star */]: 'multiply',
    [6 /* TokenType.Times */]: 'multiply',
    [8 /* TokenType.Caret */]: 'pow',
    [7 /* TokenType.Slash */]: 'divide',
    [18 /* TokenType.Frac */]: 'divide',
    [14 /* TokenType.Bar */]: 'abs',
    [17 /* TokenType.Sqrt */]: 'sqrt',
    [19 /* TokenType.Sin */]: 'sin',
    [20 /* TokenType.Cos */]: 'cos',
    [21 /* TokenType.Tan */]: 'tan',
    [22 /* TokenType.Csc */]: 'csc',
    [23 /* TokenType.Sec */]: 'sec',
    [24 /* TokenType.Cot */]: 'cot',
    [25 /* TokenType.Arcsin */]: 'asin',
    [26 /* TokenType.Arccos */]: 'acos',
    [27 /* TokenType.Arctan */]: 'atan',
    [28 /* TokenType.Sinh */]: 'sinh',
    [29 /* TokenType.Cosh */]: 'cosh',
    [30 /* TokenType.Tanh */]: 'tanh',
    [31 /* TokenType.Log */]: 'log10',
    [32 /* TokenType.Ln */]: 'log',
    [42 /* TokenType.Det */]: 'det',
    [45 /* TokenType.Eigenvectors */]: 'eigenvectors',
    [44 /* TokenType.Eigenvalues */]: 'eigenvalues',
    [46 /* TokenType.Cross */]: 'cross',
    [47 /* TokenType.Proj */]: 'proj',
    [48 /* TokenType.Comp */]: 'comp',
    [49 /* TokenType.Norm */]: 'norm',
    [50 /* TokenType.Inv */]: 'inv'
};
export class Token {
    /*
    * @constructor Token
    */
    constructor(lexeme, type, pos) {
        this.lexeme = lexeme;
        this.type = type;
        this.pos = pos;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Token.js.map