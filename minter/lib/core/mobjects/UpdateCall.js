import { remove } from '../../core/functions/arrays.js';
export class UpdateCall {
    constructor(mobject, dict) {
        this.mobject = mobject;
        this.dict = dict;
    }
    hasSameTarget(call) {
        return this.mobject == call.mobject;
    }
    joinCall(call) {
        if (!this.hasSameTarget(call)) {
            throw "Update call cannot be joined because they don't have the same target";
        }
        this.dict = Object.assign(this.dict, call.dict);
    }
    call() {
        for (let key of Object.keys(this.dict)) {
            if (typeof this.dict[key] == 'function') {
                this.dict[key] = this.dict[key]();
            }
        }
        this.mobject.update(this.dict);
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export class UpdateCalls extends Array {
    includeCall(call) {
        for (let call2 of this) {
            if (call.hasSameTarget(call2)) {
                call2.joinCall(call);
                return;
            }
        }
        this.push(call);
    }
    includeCalls(calls) {
        for (let call of calls) {
            this.includeCall(call);
        }
    }
    independentCalls() {
        let ret = new UpdateCalls();
        for (let call of this) {
            var isDependent = false;
            for (let call2 of this) {
                if (call.mobject.dependsOn(call2.mobject)) {
                    isDependent = true;
                }
            }
            if (!isDependent) {
                ret.push(call);
            }
        }
        return ret;
    }
    callIndependents() {
        for (let call of this.independentCalls()) {
            call.call();
            remove(this, call);
        }
    }
    call() {
        while (this.length > 0) {
            this.callIndependents();
        }
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=UpdateCall.js.map