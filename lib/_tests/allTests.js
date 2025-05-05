import { BundledTest } from './Tests.js';
import { ColorTest } from './unit_tests/core/classes/ColorTest.js';
import { CopyingTest } from './unit_tests/core/functions/CopyingTest.js';
import { ExtendedObjectTest } from './unit_tests/core/classes/ExtendedObjectTest.js';
import { MobjectTest } from './unit_tests/core/mobjects/MobjectTest.js';
import { TransformTest } from './unit_tests/core/classes/TransformTest.js';
import { VertexTest } from './unit_tests/core/functions/VertexTest.js';
export const AllTests = new BundledTest({
    name: 'all tests',
    subtests: [
        ColorTest,
        CopyingTest,
        ExtendedObjectTest,
        MobjectTest,
        TransformTest,
        VertexTest
    ],
    silenceSubtests: true
});
//# sourceMappingURL=allTests.js.map