import { ValueTest } from '@bhbr/tsts';
import { ancestry } from '../upper-class.js';
class A {
}
class B extends A {
}
let a = new A();
let b = new B();
let test1 = new ValueTest({
    name: 'Ancestry of a direct subclass of Object',
    function: () => ancestry(a),
    value: ['Object', 'A']
});
test1.run();
let test2 = new ValueTest({
    name: 'Ancestry of a two-level subclass of Object',
    function: () => ancestry(b),
    value: ['Object', 'A', 'B']
});
test2.run();
//# sourceMappingURL=upper-class_tests.js.map