import { View } from '../../core/mobjects/View.js';
import { Color } from '../../core/classes/Color.js';
export class VView extends View {
    defaults() {
        return {
            svg: document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
            path: document.createElementNS('http://www.w3.org/2000/svg', 'path'),
            fillColor: Color.white(),
            fillOpacity: 1,
            strokeColor: Color.white(),
            strokeWidth: 1
        };
    }
    mutabilities() {
        return {
            svg: 'never',
            path: 'never'
        };
    }
    setup() {
        super.setup();
        this.svg.setAttribute('class', 'mobject-svg');
        this.svg.style.overflow = 'visible';
        this.div.appendChild(this.svg);
        this.svg.appendChild(this.path);
    }
    redraw() {
        super.redraw();
        if (!this.svg || !this.path) {
            return;
        }
        let pathString = this.mobject.pathString();
        if (pathString.includes('NaN')) {
            return;
        }
        this.updatePath(pathString);
    }
    updatePath(pathString) {
        this.path.setAttribute('d', pathString);
        this.path.style['fill'] = this.fillColor.toHex();
        this.path.style['fill-opacity'] = this.fillOpacity.toString();
        this.path.style['stroke'] = this.strokeColor.toHex();
        this.path.style['stroke-width'] = this.strokeWidth.toString();
    }
}
//# sourceMappingURL=VView.js.map