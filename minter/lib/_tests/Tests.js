import { equalArrays } from '../core/functions/arrays.js';
import { equalObjects } from '../core/functions/copying.js';
class Test {
    constructor(args) {
        this.functionToTest = args['function'];
        this.functionResult = undefined;
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
        this.testLog(`Running ${this.name}...`);
        let passed = this.mereRun();
        if (passed) {
            this.testLog(`PASSED: ${this.name} `, '#070');
        }
        else {
            this.testLog(`FAILED: ${this.name} `, '#700');
            this.onTestFailed();
        }
        return true;
    }
    testLog(str, color = 'rgba(0, 0, 0, 0)') {
        let indentation = ' '.repeat(4 * this.indentationLevel);
        console.log(indentation + '%c ' + str, `background-color: ${color}`);
    }
    mereRun() {
        if (this.catchErrors) {
            try {
                return this.unsafeRun();
            }
            catch {
                return false;
            }
        }
        else {
            return this.unsafeRun();
        }
    }
    unsafeRun() {
        console.error('Please subclass Test');
        return false;
    }
    onTestFailed() { }
}
export class ExecutionTest extends Test {
    unsafeRun() {
        this.functionResult = this.functionToTest();
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
        this.functionResult = this.functionToTest();
        return this.condition(this.functionResult);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class ValueTest extends ConditionTest {
    constructor(args) {
        super(args);
        this.expectedResult = args['value'];
        this.condition = (x) => {
            if (x instanceof Array && this.expectedResult instanceof Array) {
                return equalArrays(x, this.expectedResult);
            }
            else if (typeof x == 'object' && typeof this.expectedResult == 'object') {
                return equalObjects(x, this.expectedResult);
            }
            else {
                return x === this.expectedResult;
            }
        };
    }
    onTestFailed() {
        this.testLog(`got result`);
        console.log(this.functionResult);
        this.testLog(`expected`);
        console.log(this.expectedResult);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class NumberValueTest extends ValueTest {
    constructor(args) {
        super(args);
        this.expectedResult = args['value'];
        this.precision = args['precision'] ?? 1e-12;
        this.condition = (x) => {
            return Math.abs(x - this.expectedResult) < this.precision;
        };
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class AssertionTest extends ValueTest {
    constructor(args) {
        super(args);
        this.expectedResult = true;
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
            this.functionResult = this.functionToTest();
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