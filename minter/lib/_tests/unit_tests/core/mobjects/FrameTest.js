import { Frame } from '../../../../core/mobjects/Frame.js';
import { vertexEquals } from '../../../../core/functions/vertex.js';
import { AssertionTest, BundledTest } from '../../../../_tests/Tests.js';
export const FrameTest = new BundledTest({
    name: 'Frame test',
    subtests: [
        new AssertionTest({
            name: "A frame with no parent has as upper left corner the origin",
            function: function () {
                let f = new Frame({
                    anchor: [100, 200],
                    width: 300,
                    height: 400
                });
                return vertexEquals(f.ulCorner(), [0, 0]);
            },
        })
    ]
});
//# sourceMappingURL=FrameTest.js.map