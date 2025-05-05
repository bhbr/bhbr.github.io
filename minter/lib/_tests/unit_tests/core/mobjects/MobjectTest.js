import { Mobject } from '../../../../core/mobjects/Mobject.js';
import { vertexAdd, vertexEquals } from '../../../../core/functions/vertex.js';
import { Color } from '../../../../core/classes/Color.js';
import { AssertionTest, ValueTest, BundledTest } from '../../../../_tests/Tests.js';
export const MobjectTest = new BundledTest({
    name: 'Mobject test',
    subtests: [
        new AssertionTest({
            name: 'Anchors of nested mobjects transform properly',
            function: function () {
                let parent = new Mobject({
                    anchor: [100, 50]
                });
                let child = new Mobject({
                    anchor: [25, 30]
                });
                parent.add(child);
                let v = [42, 96];
                let transformedAnchor = child.frame.transformLocalPoint(v, parent.frame);
                let addedAnchors = vertexAdd(v, child.anchor);
                return vertexEquals(transformedAnchor, addedAnchors);
            }
        }),
        new ValueTest({
            name: 'A mobject has_a fill color',
            function: function () {
                let mob = new Mobject({ backgroundColor: Color.green() });
                return mob.view.div.style.backgroundColor;
            },
            value: 'rgb(0, 255, 0)'
        })
    ]
});
//# sourceMappingURL=MobjectTest.js.map