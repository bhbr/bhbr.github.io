import { equalObjects } from '../../../../core/functions/copying.js';
import { AssertionTest, BundledTest } from '../../../../_tests/Tests.js';
export const CopyingTest = new BundledTest({
    name: 'Copying test',
    subtests: [
        new AssertionTest({
            name: 'Equal objects are equal',
            function: function () {
                let A = { 'a': 1, 'b': 2 };
                let B = { 'a': 1, 'b': 2 };
                return equalObjects(A, B);
            }
        })
    ]
});
//# sourceMappingURL=CopyingTest.js.map