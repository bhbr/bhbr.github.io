import { BundledTest } from '@bhbr/tsts';
import { FrogTest } from './unit_tests/FrogTest.js';
let frogTests = new BundledTest({
    name: 'Minter frog tests',
    subtests: [
        FrogTest
    ],
    silenceSubtests: false
});
frogTests.run();
//# sourceMappingURL=run_all_tests.js.map