export class MutabilityError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'MutabilityError';
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class AssignmentError extends Error {
    constructor() {
        super(...arguments);
        this.name = 'AssignmentError';
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Errors.js.map