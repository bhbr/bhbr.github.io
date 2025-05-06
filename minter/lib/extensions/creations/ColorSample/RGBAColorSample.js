import { ColorSample } from '../../../extensions/creations/ColorSample/ColorSample.js';
export class RGBAColorSample extends ColorSample {
    defaults() {
        return {
            inputProperties: [
                { name: 'red', displayName: null, type: 'number' },
                { name: 'green', displayName: null, type: 'number' },
                { name: 'blue', displayName: null, type: 'number' },
                { name: 'alpha', displayName: null, type: 'number' }
            ]
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=RGBAColorSample.js.map