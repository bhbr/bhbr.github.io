export class Dependency {
    constructor(args = {}) {
        this.source = args['source'];
        this.outputName = args['outputName'];
        if (this.outputName === undefined) {
            this.outputName = null;
        }
        this.target = args['target'];
        this.inputName = args['inputName'];
        if (this.inputName === undefined) {
            this.inputName = null;
        }
    }
    delete() {
        this.source.removeDependency(this);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Dependency.js.map