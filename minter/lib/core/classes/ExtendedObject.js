import { equalObjects } from '../../core/functions/copying.js';
import { ClassDeclaration } from './ClassDeclaration.js';
import { isVertex, vertexEquals, isVertexArray, vertexArrayEquals } from '../../core/functions/vertex.js';
import { AssignmentError } from './Errors.js';
import { remove } from '../../core/functions/arrays.js';
export class ExtendedObject {
    // These properties need to be treated separately so we can modify them without declaring a public writable property. They are hidden inside this private dictionary, and modified by calling the update method, which internally accesses this dictionary.
    mutabilities() { return {}; }
    defaults() { return {}; }
    // Empty base implementations that ground the recursive buildup of the fullMutabilities and fullDefaults
    constructor(args = {}) {
        // Create the static classDeclarations object if it hasn't been done yet
        if (ExtendedObject.classDeclarations === undefined) {
            ExtendedObject.initializeClassDeclarations();
        }
        // If this is the first instance of a subclass, register the class declaration
        if (ExtendedObject.classDeclarations[this.constructor.name] === undefined) {
            // This requires all ancestor classes to be registered already, so loop over their prototypes
            let protos = this.prototypes();
            for (let obj of protos) {
                if (ExtendedObject.classDeclarations[obj.constructor.name] !== undefined) {
                    continue;
                }
                obj.registerOwnClassDeclaration();
            }
        }
        // Initialize the list of properties
        Object.defineProperty(this, 'properties', {
            value: [],
            writable: false,
            enumerable: true
        });
        Object.defineProperty(this, 'indirectlyWritableProperties', {
            value: {},
            writable: false,
            enumerable: true
        });
        // Are the initialization values valid?
        this.checkConstructorArgs(args);
        // If yes, complement them with the default values and set them
        let initialArgs = this.fullDefaults();
        Object.assign(initialArgs, args);
        initialArgs = this.synchronizeUpdateArguments(initialArgs);
        this.setProperties(initialArgs);
    }
    registerOwnClassDeclaration() {
        let parentClass = Object.getPrototypeOf(this);
        // Get the mutabilities
        var mutabilities = this.mutabilities();
        // If the class does not subclass the mutabilities() method, this would just call super method. In that case set the mutabilities to an empty object to express that nothing has changed in the subclass.
        let parentMutabilities = parentClass.mutabilities();
        if (equalObjects(parentMutabilities, mutabilities)) {
            mutabilities = {};
        }
        // Get the defaults function/method
        // In order to decide whether this one has been overridden, evaluate both the method and the super method and compare the generated defaults objects. If they are the same, retain a function that creates an empty object.
        let defaultsObject = this.defaults();
        let parentDefaultsObject = parentClass.defaults();
        let flag = equalObjects(parentDefaultsObject, defaultsObject);
        let defaultsFunction = flag ? function () { return {}; } : this.defaults;
        // Create the class declaration from the class name, parent class declaration, mutabilities object and defaults function
        let classDeclarationName = this.constructor.name;
        let parentClassName = parentClass.constructor.name;
        let parentClassDeclaration = ExtendedObject.classDeclarations[parentClassName];
        ExtendedObject.classDeclarations[classDeclarationName] = new ClassDeclaration({
            name: classDeclarationName,
            parent: parentClassDeclaration,
            mutabilities: mutabilities,
            defaults: defaultsFunction
        });
    }
    static initializeClassDeclarations() {
        ExtendedObject.classDeclarations = {
            // The first entry is for the base class
            ExtendedObject: new ClassDeclaration({
                name: 'ExtendedObject',
                parent: null,
                mutabilities: {},
                defaults: function () { return {}; }
            })
        };
    }
    prototypes() {
        // A list of the class's prototype object, from ExtendedObject to the class itself
        let ret = [];
        var obj = Object.getPrototypeOf(this);
        while (obj != null) {
            ret.push(obj);
            obj = Object.getPrototypeOf(obj);
        }
        ret.pop(); // superfluous entry of type Object
        return ret.reverse();
    }
    ancestry() {
        // for debugging
        return this.prototypes().map((obj) => obj.constructor.name);
    }
    checkConstructorArgs(args) {
        // Only properties with mutability 'always', 'on_update' or 'on_init' can be set in the constructor call
        for (let [prop, value] of Object.entries(args)) {
            if (this.mutability(prop) === 'never' || this.mutability(prop) === 'in_subclass') {
                throw new AssignmentError(`Property ${prop} in class ${this.constructor.name} cannot be assigned new value ${value} in constructor`);
            }
        }
    }
    setProperties(args = {}) {
        // Accessors (abstract properties that are just setters, e. g. a Circle's midpoint) are set only after all non-accessors have been set. So we split the args along that separation.
        // Set the non-accessors (properties that have their own state)
        let nonAccessorArgs = this.nonAccessorArgs(args);
        for (let [prop, value] of Object.entries(nonAccessorArgs)) {
            this.setProperty(prop, value);
        }
        // Set the accessors (abstract properties)
        let accessorArgs = this.accessorArgs(args);
        for (let [prop, value] of Object.entries(accessorArgs)) {
            this.setProperty(prop, value);
        }
    }
    accessorArgs(args) {
        let accessorArgs = {};
        for (let [prop, value] of Object.entries(args)) {
            if (this.isAccessor(prop)) {
                accessorArgs[prop] = value;
            }
        }
        return accessorArgs;
    }
    nonAccessorArgs(args) {
        let nonAccessorArgs = {};
        for (let [prop, value] of Object.entries(args)) {
            if (!this.isAccessor(prop)) {
                nonAccessorArgs[prop] = value;
            }
        }
        return nonAccessorArgs;
    }
    setProperty(prop, value) {
        if (!this.properties.includes(prop) && !this.isAccessor(prop)) {
            this.createProperty(prop, value);
        }
        else {
            this.setExistingProperty(prop, value);
        }
    }
    setExistingProperty(prop, value) {
        if (this.isAccessor(prop)) {
            let accessor = this.getAccessor(prop);
            accessor.call(this, value);
            return;
        }
        if (this.isWritable(prop)) {
            this[prop] = value;
        }
        else {
            this.indirectlyWritableProperties[prop] = value;
        }
    }
    createProperty(prop, value) {
        // i. e. a property that can only the changed via the update() method
        let isSettable = (this.mutability(prop) == 'always');
        if (isSettable) {
            Object.defineProperty(this, prop, {
                value: value,
                writable: true,
                enumerable: true
            });
        }
        else {
            this.indirectlyWritableProperties[prop] = value;
            Object.defineProperty(this, prop, {
                get() {
                    return this.indirectlyWritableProperties[prop];
                },
                set(newValue) {
                    throw new AssignmentError(`Use the update method to change the value of property ${prop} in class ${this.constructor.name}`);
                },
                enumerable: true
            });
        }
        this.properties.push(prop);
    }
    removeProperty(prop) {
        this[prop] = undefined;
        remove(this.properties, prop);
    }
    isAccessor(prop) {
        if (Object.keys(this.indirectlyWritableProperties).includes(prop)) {
            return false;
        }
        let pd = this.propertyDescriptor(prop);
        if (pd === undefined) {
            return false;
        }
        if (!pd.enumerable) {
            return true;
        }
        let s = pd['set'];
        let flag = (s !== undefined);
        return flag;
    }
    propertyDescriptors() {
        let pds = {};
        var obj = this;
        while (obj) {
            pds = Object.assign(pds, Object.getOwnPropertyDescriptors(obj));
            obj = Object.getPrototypeOf(obj);
        }
        return pds;
    }
    propertyDescriptor(prop) {
        let pds = this.propertyDescriptors();
        return pds[prop];
    }
    getAccessor(prop) {
        let pd = this.propertyDescriptor(prop);
        return (pd === undefined || pd.enumerable) ? undefined : pd.set;
    }
    mutability(prop) {
        return ExtendedObject.classDeclarations[this.constructor.name].mutability(prop);
    }
    isWritable(prop) {
        return (this.mutability(prop) === 'always');
    }
    synchronizeUpdateArguments(args) {
        /*
        Override this method to resolve possible conflicts in update arguments.
        Example: Should Circle({ midpoint: ..., anchor: ... }) silently fit the radius or raise an error?
        */
        return args;
    }
    checkUpdateArgs(args) {
        // Check whether any properites are not updatable
        for (let [prop, value] of Object.entries(args)) {
            if (this.mutability(prop) !== 'always' && this.mutability(prop) !== 'on_update') {
                throw new AssignmentError(`Property ${prop} in class ${this.constructor.name} is not updatable, cannot be assigned new value ${value} after initialization`);
            }
        }
    }
    update(args = {}) {
        /*
        Override this method in subclasses. It MUST at some point call super.update(args).
        */
        this.checkUpdateArgs(args);
        args = this.synchronizeUpdateArguments(args);
        args = this.removeUnchangedProperties(args); // for performance
        this.setProperties(args);
    }
    removeUnchangedProperties(args) {
        for (let [prop, value] of Object.entries(args)) {
            if (this[prop] === undefined) {
                continue;
            }
            if (typeof value != 'object' || value === null) {
                if (this[prop] === value) {
                    delete args[prop];
                }
            }
            else if (value.constructor.name == 'Transform') {
                if (this[prop].equals(value)) {
                    delete args[prop];
                }
            }
            else if (isVertex(value)) {
                if (vertexEquals(this[prop], value)) {
                    delete args[prop];
                }
            }
            else if (isVertexArray(value)) {
                if (vertexArrayEquals(this[prop], value)) {
                    delete args[prop];
                }
            }
            else { // any other kind of object
                if (this[prop] == value) {
                    delete args[prop];
                }
            }
        }
        return args;
    }
    fullDefaults() {
        return ExtendedObject.classDeclarations[this.constructor.name].fullDefaults();
    }
    fullMutabilities() {
        return ExtendedObject.classDeclarations[this.constructor.name].fullMutabilities;
    }
    copyFrom(obj) {
        let argsDict = {};
        for (let prop of obj.properties) {
            argsDict[prop] = obj[prop];
        }
        this.update(argsDict);
    }
    static clearClassDeclarations() {
        // for testing
        ExtendedObject.classDeclarations = undefined;
    }
}
//# sourceMappingURL=ExtendedObject.js.map