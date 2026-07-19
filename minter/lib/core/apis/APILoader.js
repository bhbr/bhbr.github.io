import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
import { getPaper } from '../../core/functions/getters.js';
export class APILoader extends ExtendedObject {
    defaults() {
        return {
            status: 'pending'
        };
    }
    load() {
        this.update({
            status: 'loaded'
        });
        getPaper().loadedAPI(this);
    }
    onload() {
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=APILoader.js.map