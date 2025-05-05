import { vertexCloseTo, vertexEquals } from '../../../../core/functions/vertex.js';
import { AssertionTest, BundledTest } from '../../../../_tests/Tests.js';
export const VertexTest = new BundledTest({
    name: 'Vertex test',
    subtests: [
        new AssertionTest({
            name: 'A vertex is close to itself',
            function: function () {
                let v = [1, 2];
                return vertexCloseTo(v, v);
            }
        }),
        new AssertionTest({
            name: 'A vertex equals itself',
            function: function () {
                let v = [1, 2];
                return vertexEquals(v, v);
            }
        }),
    ]
});
//# sourceMappingURL=VertexTest.js.map