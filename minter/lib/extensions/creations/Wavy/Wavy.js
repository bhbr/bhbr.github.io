import { CindyCanvas } from '../../../extensions/creations/CindyCanvas/CindyCanvas.js';
import { Color } from '../../../core/classes/Color.js';
export class Wavy extends CindyCanvas {
    defaults() {
        return {
            sourceYPosition: 0.2,
            inputProperties: [
                { name: 'wavelength', displayName: null, type: 'number' },
                { name: 'frequency', displayName: null, type: 'number' },
                { name: 'nbSources', displayName: '# sources', type: 'number' },
                { name: 'color', displayName: null, type: 'Color' }
            ],
            outputProperties: [],
            wavelength: 0.25,
            frequency: 0,
            nbSources: 1,
            color: Color.green()
        };
    }
    mutabilities() {
        return {
            sourceYPosition: 'on_init',
            inputProperties: 'in_subclass',
            outputProperties: 'in_subclass'
        };
    }
    initCode() {
        return `W(x, p, l, f) := 0.5 * (1 + sin(|x - p| / l - seconds() * f)); drawcmd() := ( colorplot((${this.codeRed()}, ${this.codeGreen()}, ${this.codeBlue()})););` + super.initCode();
    }
    WfunctionCode() {
        let l = 0.1 * (this.wavelength || 1);
        let f = 10 * (this.frequency || 1);
        let code = '(';
        for (let i = 0; i < this.nbSources; i++) {
            if (i > 0) {
                code += ' + ';
            }
            code += `W(#, A${i}, ${l}, ${f})`;
        }
        code += `) / ${this.nbSources}`;
        return code;
    }
    codeRed() {
        var w = this.WfunctionCode();
        w += ` * ${this.color.red}`;
        return w;
    }
    codeGreen() {
        var w = this.WfunctionCode();
        w += ` * ${this.color.green}`;
        return w;
    }
    codeBlue() {
        var w = this.WfunctionCode();
        w += ` * ${this.color.blue}`;
        return w;
    }
    sourcePositions() {
        let p = [];
        let dx = 1 / this.nbSources;
        for (let i = 0; i < this.nbSources; i++) {
            p.push([(i + 0.5) * dx, this.sourceYPosition]);
        }
        return p;
    }
    geometry() {
        let ret = [];
        let i = 0;
        for (let point of this.sourcePositions()) {
            ret.push({ name: "A" + i, kind: "P", type: "Free", pos: point });
            i += 1;
        }
        return ret;
    }
    update(args = {}, redraw = true) {
        super.update(args, false);
        this.nbSources = Math.floor(this.nbSources);
        if (this.core == undefined || this.sourcePositions().length == 0) {
            return;
        }
        if (args['nbSources'] != undefined) {
            this.reload(args);
        }
        let code = `drawcmd() := ( colorplot((${this.codeRed()}, ${this.codeGreen()}, ${this.codeBlue()})););`;
        this.core.evokeCS(code);
        if (redraw) {
            this.view.redraw();
        }
    }
}
//# sourceMappingURL=Wavy.js.map