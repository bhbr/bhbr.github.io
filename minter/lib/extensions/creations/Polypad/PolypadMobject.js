import { Linkable } from '../../../core/linkables/Linkable.js';
export class PolypadMobject extends Linkable {
    defaults() {
        return {
            innerDiv: document.createElement('div')
        };
    }
    setup() {
        super.setup();
        this.innerDiv.id = `polypad`;
        this.innerDiv.style.width = `${this.frameWidth}px`;
        this.innerDiv.style.height = `${this.frameHeight}px`;
        this.view.div.appendChild(this.innerDiv);
        window.setTimeout(function () {
            Polypad.create(this.innerDiv);
        }.bind(this), 1000);
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=PolypadMobject.js.map