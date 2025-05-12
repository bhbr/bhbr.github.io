import { Rectangle } from '../../core/shapes/Rectangle.js';
export class Square extends Rectangle {
    defaults() {
        return {
            sidelength: 100,
            width: 100,
            height: 100
        };
    }
    get sidelength() { return this.width; }
    set sidelength(newValue) {
        this.width = newValue;
        this.height = newValue;
    }
    synchronizeUpdateArguments(args = {}) {
        let newSidelength = args['sidelength'];
        if (newSidelength !== undefined) {
            args['sidelength'] = newSidelength;
        }
        delete args['width'];
        delete args['height'];
        return args;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Square.js.map