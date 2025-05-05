class Test {
    constructor(args) {
        this.functionToTest = args['function'];
        this.silent = args['silent'] ?? false;
        this.catchErrors = args['catchErrors'] ?? false;
        this.indentationLevel = args['indentationLevel'] ?? 0;
        if (!this.functionToTest) {
            return;
        } // might be a bundled test, where this function is only defined later
        this.name = args['name'] ?? 'Test_' + this.functionToTest.name;
    }
    run(silent = null) {
        silent = (silent ?? this.silent) || this.silent;
        if (silent)
            return this.mereRun();
        let indentation = ' '.repeat(4 * this.indentationLevel);
        console.log(indentation + `Running ${this.name}...`);
        let result = this.mereRun();
        if (result) {
            console.log(indentation + `%c PASSED: ${this.name} `, 'background-color: #070');
        }
        else {
            console.log(indentation + `%c FAILED: ${this.name} `, 'background-color: #700');
        }
        return result;
    }
    mereRun() {
        if (this.catchErrors) {
            try {
                let result = this.unsafeRun();
                return result;
            }
            catch {
                return false;
            }
        }
        else {
            let result = this.unsafeRun();
            return result;
        }
    }
    unsafeRun() {
        console.error('Please subclass Test');
        return false;
    }
}
export class ExecutionTest extends Test {
    unsafeRun() {
        this.functionToTest();
        return true;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class ConditionTest extends Test {
    constructor(args) {
        super(args);
        this.condition = args['condition'];
    }
    unsafeRun() {
        let result = this.functionToTest();
        return this.condition(result);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class ValueTest extends ConditionTest {
    constructor(args) {
        super(args);
        this.value = args['value'];
        this.condition = (x) => (x === this.value);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class AssertionTest extends ValueTest {
    constructor(args) {
        super(args);
        this.value = true;
        this.condition = (x) => x;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class ErrorTest extends Test {
    constructor(args) {
        super(args);
        this.errorName = args['errorName'] ?? null;
    }
    mereRun() {
        try {
            this.functionToTest();
        }
        catch (error) {
            if (this.errorName === null) {
                return true;
            }
            if (error.name == this.errorName) {
                return true;
            }
            if (this.catchErrors) {
                return false;
            }
            throw error;
        }
        return false;
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class BundledTest extends AssertionTest {
    constructor(args) {
        super(args);
        this.subtests = args['subtests'] || [];
        this.silenceSubtests = args['silenceSubtests'] ?? false;
        this.functionToTest = function () {
            var result = true;
            for (let test of this.subtests) {
                let previousIndentationLevel = test.indentationLevel;
                let previousSilentFlag = test.silent;
                test.indentationLevel = this.indentationLevel + 1;
                test.silent = this.silenceSubtests || this.silent || test.silent;
                let subtestResult = test.run();
                result = result && subtestResult;
                test.indentationLevel = previousIndentationLevel;
                test.silent = previousSilentFlag;
            }
            return result;
        };
        if (args['name']) {
            this.name = args['name'];
        }
        else {
            this.name = 'BundledTest';
            for (let test of this.subtests) {
                this.name += '_' + test.name;
            }
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Tests.js.map