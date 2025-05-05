import { ColorSample } from '../../../extensions/creations/ColorSample/ColorSample.js';
export class RGBAColorSample extends ColorSample {
    defaults() {
        return {
            inputProperties: [
                { name: 'red', type: 'number' },
                { name: 'green', type: 'number' },
                { name: 'blue', type: 'number' },
                { name: 'alpha', type: 'number' }
            ]
        };
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=RGBAColorSample.js.map