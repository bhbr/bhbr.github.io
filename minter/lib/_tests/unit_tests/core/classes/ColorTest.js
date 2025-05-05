import { Color } from '../../../../core/classes/Color.js';
import { ValueTest, BundledTest } from '../../../../_tests/Tests.js';
export const ColorTest = new BundledTest({
    name: 'Color test',
    subtests: [
        new ValueTest({
            name: 'Colors properly export to hex',
            function: function () {
                let c = Color.red();
                return c.toHex();
            },
            value: '#ff0000'
        })
    ]
});
//# sourceMappingURL=ColorTest.js.map