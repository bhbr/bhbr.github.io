import { ExtendedObject } from '../../../../core/classes/ExtendedObject.js';
import { ExecutionTest, ValueTest, AssertionTest, ErrorTest, BundledTest } from '../../../../_tests/Tests.js';
class FirstClass extends ExtendedObject {
    defaults() {
        return {
            genericallySettableProperty: 10,
            settableProperty: 20,
            updatableProperty: 30,
            initializableProperty: 40,
            subclassableProperty: 50,
            immutableProperty: 60,
        };
    }
    mutabilities() {
        return {
            settableProperty: 'always',
            updatableProperty: 'on_update',
            initializableProperty: 'on_init',
            subclassableProperty: 'in_subclass',
            immutableProperty: 'never'
        };
    }
}
/////////////////////////////////////////
// BASIC DEFAULTS AND MUTABILITY TESTS //
/////////////////////////////////////////
let Basic_defaults_and_mutability_tests = new BundledTest({
    name: 'Basic defaults and mutability tests',
    silenceSubtests: false,
    subtests: [
        new AssertionTest({
            name: 'Every property has a mutability',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                for (let prop of A.properties) {
                    let mut = A.mutability(prop);
                    if (mut === null || mut === undefined) {
                        console.error(`Mutability of ${prop} on class FirstClass is ${mut}`);
                        return false;
                    }
                }
                return true;
            }
        }),
        new ValueTest({
            name: 'A property is by_default settable',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                return A.mutability('genericallySettableProperty');
            },
            value: 'always'
        }),
        new AssertionTest({
            name: 'Every property has a default value',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass(); // default values: see above
                return (A.genericallySettableProperty == 10
                    && A.settableProperty == 20
                    && A.updatableProperty == 30
                    && A.initializableProperty == 40
                    && A.subclassableProperty == 50
                    && A.immutableProperty == 60);
            }
        })
    ]
});
///////////////////////////////////////////////////
// SETTING PROPERTY VALUES AFTER OBJECT CREATION //
///////////////////////////////////////////////////
let Setting_property_values_after_object_creation = new BundledTest({
    name: 'Setting property values after object creation',
    silenceSubtests: false,
    tests: [
        new ExecutionTest({
            name: 'A settable property can be set after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.settableProperty = 21;
            }
        }),
        new ValueTest({
            name: 'A settable property will be set properly after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.settableProperty = 21;
                return A.settableProperty;
            },
            value: 21
        }),
        new ErrorTest({
            name: 'An updatable property cannot be set after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.updatableProperty = 31;
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'An initializable property cannot_be set after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.initializableProperty = 41;
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'A subclassable property cannot be set after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.subclassableProperty = 51;
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot be set after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.immutableProperty = 61;
            },
            errorName: 'AssignmentError'
        })
    ]
});
////////////////////////////////////////////////////
// UPDATING PROPERTY VALUES AFTER OBJECT CREATION //
////////////////////////////////////////////////////
let Updating_property_values_after_object_creation = new BundledTest({
    name: 'Updating property values after object creation tests',
    silenceSubtests: false,
    subtests: [
        new ExecutionTest({
            name: 'A settable property can be updated after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ settableProperty: 21 });
            }
        }),
        new ValueTest({
            name: 'A settable property will be updated properly after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ settableProperty: 21 });
                return A.settableProperty;
            },
            value: 21
        }),
        new ExecutionTest({
            name: 'An updatable property can be updated after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ updatableProperty: 31 });
            }
        }),
        new ValueTest({
            name: 'An updatable property will be updated properly after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ updatableProperty: 31 });
                return A.updatableProperty;
            },
            value: 31
        }),
        new ErrorTest({
            name: 'An initializable property cannot be update after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ initializableProperty: 41 });
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'A subclassable property cannot be update after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ subclassableProperty: 51 });
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot be updated after object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass();
                A.update({ immutableProperty: 61 });
            },
            errorName: 'AssignmentError'
        })
    ]
});
/////////////////////////////////////////////////
// CHANGING PROPERTY VALUES ON OBJECT CREATION //
/////////////////////////////////////////////////
let Changing_property_values_on_object_creation = new BundledTest({
    name: 'Changing property values on object creation',
    silenceSubtests: false,
    subtests: [
        new ExecutionTest({
            name: 'A settable property can be changed on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ settableProperty: 21 });
            }
        }),
        new ValueTest({
            name: 'A settable property will be changed properly on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ settableProperty: 21 });
                return A.settableProperty;
            },
            value: 21
        }),
        new ExecutionTest({
            name: 'An updatable property can be changed on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ updatableProperty: 31 });
            }
        }),
        new ValueTest({
            name: 'An updatable property will be changed properly on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ updatableProperty: 31 });
                return A.updatableProperty;
            },
            value: 31
        }),
        new ExecutionTest({
            name: 'An initializable property can be changed on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ initializableProperty: 41 });
            }
        }),
        new ValueTest({
            name: 'An initializable property will be changed properly on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ initializableProperty: 41 });
                return A.initializableProperty;
            },
            value: 41
        }),
        new ErrorTest({
            name: 'A subclassable property cannot be changed on object creation',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ subclassableProperty: 51 });
            },
            errorName: 'AssignmentError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot be changed on object creation',
            function() {
                ExtendedObject.clearClassDeclarations();
                let A = new FirstClass({ immutableProperty: 61 });
            },
            errorName: 'AssignmentError'
        })
    ]
});
////////////////////////////////////////////
// CHANGING PROPERTY VALUES IN A SUBCLASS //
////////////////////////////////////////////
let Changing_property_values_in_a_subclass = new BundledTest({
    name: 'Changing property values in a subclass',
    silenceSubtests: false,
    subtests: [
        new ExecutionTest({
            name: 'A settable property can be changed in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 10
                        };
                    }
                }
                let A = new SecondClass();
            }
        }),
        new ValueTest({
            name: 'A mutable property will be changed properly in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 10
                        };
                    }
                }
                let A = new SecondClass();
                return A.settableProperty;
            },
            value: 10
        }),
        new ExecutionTest({
            name: 'An initializable property can be changed in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            initializableProperty: 20
                        };
                    }
                }
                let A = new SecondClass();
            }
        }),
        new ValueTest({
            name: 'An initializable property will be changed properly in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            initializableProperty: 20
                        };
                    }
                }
                let A = new SecondClass();
                return A.initializableProperty;
            },
            value: 20
        }),
        new ExecutionTest({
            name: 'A subclassable property can be changed in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            subclassableProperty: 20
                        };
                    }
                }
                let A = new SecondClass();
            }
        }),
        new ValueTest({
            name: 'A subclassable property will be changed properly in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            subclassableProperty: 20
                        };
                    }
                }
                let A = new SecondClass();
                return A.subclassableProperty;
            },
            value: 20
        }),
        new ErrorTest({
            name: 'An immutable property cannot be changed in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            immutableProperty: 40
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'AssignmentError'
        })
    ]
});
////////////////////////////////////////////////////////
// CHANGING MUTABILITY AND DEFAULT VALUES IN SUBCLASS //
////////////////////////////////////////////////////////
let Changing_mutability_and_default_values_in_subclass = new BundledTest({
    name: 'Changing mutability and default values in subclass',
    silenceSubtests: false,
    subtests: [
        new ErrorTest({
            name: 'An immutable property cannot become subclassable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            immutableProperty: 'in_subclass'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot become initializable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            immutableProperty: 'on_init'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot become updatable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            immutableProperty: 'on_update'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'An immutable property cannot become settable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            immutableProperty: 'always'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ValueTest({
            name: 'A subclassable property can become immutable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            subclassableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('subclassableProperty');
            },
            value: 'never'
        }),
        new AssertionTest({
            name: 'A subclassable property can become immutable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            subclassableProperty: 51
                        };
                    }
                    mutabilities() {
                        return {
                            subclassableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('subclassableProperty') === 'never' && A.subclassableProperty === 51);
            }
        }),
        new ErrorTest({
            name: 'A subclassable property cannot become initializable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            subclassableProperty: 'on_init'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'A subclassable property cannot become updatable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            subclassableProperty: 'on_update'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'A subclassable property cannot become settable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            subclassableProperty: 'always'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ValueTest({
            name: 'An initializable property can become immutable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            initializableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('initializableProperty');
            },
            value: 'never'
        }),
        new AssertionTest({
            name: 'An initializable property can become immutable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            initializableProperty: 41
                        };
                    }
                    mutabilities() {
                        return {
                            initializableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('initializableProperty') === 'never' && A.initializableProperty === 41);
            }
        }),
        new ValueTest({
            name: 'An initializable property can become subclassable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            initializableProperty: 'in_subclass'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('initializableProperty');
            },
            value: 'in_subclass'
        }),
        new AssertionTest({
            name: 'An initializable property can become subclassable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            initializableProperty: 41
                        };
                    }
                    mutabilities() {
                        return {
                            initializableProperty: 'in_subclass'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('initializableProperty') === 'in_subclass' && A.initializableProperty === 41);
            }
        }),
        new ErrorTest({
            name: 'An initializable property cannot become updatable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            initializableProperty: 'on_update'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ErrorTest({
            name: 'An initializable property cannot become settable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            initializableProperty: 'always'
                        };
                    }
                }
                let A = new SecondClass();
            },
            errorName: 'MutabilityError'
        }),
        new ValueTest({
            name: 'A settable property can become immutable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            settableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('settableProperty');
            },
            value: 'never'
        }),
        new AssertionTest({
            name: 'A settable property can become immutable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 21
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'never'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('settableProperty') === 'never' && A.settableProperty == 21);
            }
        }),
        new AssertionTest({
            name: 'A settable property can become immutable and have a new default value in subsubclass 1',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                }
                class ThirdClass extends SecondClass {
                    defaults() {
                        return {
                            settableProperty: 21
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'never'
                        };
                    }
                }
                let A = new ThirdClass();
                return (A.mutability('settableProperty') === 'never' && A.settableProperty == 21);
            }
        }),
        new AssertionTest({
            name: 'A settable property can become immutable and have a new default value in subsubclass 2',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 21
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'never'
                        };
                    }
                }
                class ThirdClass extends SecondClass {
                }
                let A = new ThirdClass();
                return (A.mutability('settableProperty') === 'never' && A.settableProperty == 21);
            }
        }),
        new ValueTest({
            name: 'A_settable_property_can_become_subclassable_in_subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            settableProperty: 'in_subclass'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('settableProperty');
            },
            value: 'in_subclass'
        }),
        new AssertionTest({
            name: 'A settable property can become subclassable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 10
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'in_subclass'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('settableProperty') === 'in_subclass' && A.settableProperty === 10);
            }
        }),
        new ValueTest({
            name: 'A settable property can become initializable_in_subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            settableProperty: 'on_init'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('settableProperty');
            },
            value: 'on_init'
        }),
        new AssertionTest({
            name: 'A settable property can become initializable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 10
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'on_init'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('settableProperty') === 'on_init' && A.settableProperty == 10);
            }
        }),
        new ValueTest({
            name: 'A settable property can become updatable in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    mutabilities() {
                        return {
                            settableProperty: 'on_update'
                        };
                    }
                }
                let A = new SecondClass();
                return A.mutability('settableProperty');
            },
            value: 'on_update'
        }),
        new AssertionTest({
            name: 'A settable property can become updatable and have a new default value in subclass',
            function: function () {
                ExtendedObject.clearClassDeclarations();
                class SecondClass extends FirstClass {
                    defaults() {
                        return {
                            settableProperty: 21
                        };
                    }
                    mutabilities() {
                        return {
                            settableProperty: 'on_update'
                        };
                    }
                }
                let A = new SecondClass();
                return (A.mutability('settableProperty') === 'on_update' && A.settableProperty == 21);
            }
        })
    ]
});
///////////////////////////////////
// ADDING PROPERTIES IN SUBCLASS //
///////////////////////////////////
export const An_immutable_property_can_be_added_in_a_subclass = new AssertionTest({
    name: 'An immutable property can be added in a subclass',
    function: function () {
        ExtendedObject.clearClassDeclarations();
        class SecondClass extends FirstClass {
            defaults() {
                return {
                    immutableProperty2: 7
                };
            }
            mutabilities() {
                return {
                    immutableProperty2: 'never'
                };
            }
        }
        let A = new SecondClass();
        return (A.mutability('immutableProperty2') == 'never' && A.immutableProperty2 == 7);
    }
});
export const ExtendedObjectTest = new BundledTest({
    name: 'ExtendedObject test',
    subtests: [
        Basic_defaults_and_mutability_tests,
        Setting_property_values_after_object_creation,
        Updating_property_values_after_object_creation,
        Changing_property_values_on_object_creation,
        Changing_property_values_in_a_subclass,
        Changing_mutability_and_default_values_in_subclass,
        An_immutable_property_can_be_added_in_a_subclass
    ],
    silenceSubtests: false
});
//# sourceMappingURL=ExtendedObjectTest.js.map