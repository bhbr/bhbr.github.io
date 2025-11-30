export class ParseError extends Error {
    constructor(message, token, ...args) {
        super(...args);
        this.name = 'ParseError';
        this.message = `${token.lexeme} at ${token.pos}: ${message}`;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=ParseError.js.map