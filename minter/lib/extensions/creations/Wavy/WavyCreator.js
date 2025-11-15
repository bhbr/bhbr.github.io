import { Wavy } from './Wavy.js';
import { SpanningCreator } from '../../../core/creators/SpanningCreator.js';
export class WavyCreator extends SpanningCreator {
    defaults() {
        return {
            nbSources: 1
        };
    }
    mutabilities() {
        return {
            nbSources: 'on_init'
        };
    }
    createMobject() {
        let p = this.getStartPoint();
        return new Wavy({
            anchor: p,
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height,
            nbSources: this.nbSources
        });
    }
    dissolve() {
        let cm = this.createMobject();
        this.parent.addToContent(cm);
        this.parent.remove(this);
        cm.play();
        cm.stop();
    }
}
//# sourceMappingURL=WavyCreator.js.map