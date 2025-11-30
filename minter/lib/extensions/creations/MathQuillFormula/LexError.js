export class LexError extends Error {
    constructor(message, pos, ...args) {
        super(...args);
        this.name = 'LexError';
        this.message = `at ${pos}: ${message}`;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=LexError.js.map