import { Dependency } from '../../core/mobjects/Dependency.js';
import { Line } from '../../core/shapes/Line.js';
import { Mobject } from '../../core/mobjects/Mobject.js';
import { LinkBullet } from './LinkBullet.js';
import { LINK_LINE_WIDTH } from './constants.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
export class DependencyLink extends Mobject {
    defaults() {
        return {
            dependency: new Dependency(),
            startBullet: new LinkBullet(),
            endBullet: new LinkBullet(),
            startHook: null,
            endHook: null,
            linkLine: new Line({ strokeWidth: LINK_LINE_WIDTH }),
            screenEventHandler: ScreenEventHandler.Parent
        };
    }
    mutabilities() {
        return {
            startBullet: 'on_init',
            endBullet: 'on_init',
            linkLine: 'never'
        };
    }
    get parent() {
        return super.parent;
    }
    set parent(newValue) {
        super.parent = newValue;
    }
    setup() {
        super.setup();
        this.startBullet.addDependency('midpoint', this.linkLine, 'startPoint');
        this.linkLine.update({
            startPoint: this.startBullet.midpoint
        });
        this.endBullet.addDependency('midpoint', this.linkLine, 'endPoint');
        this.linkLine.update({
            endPoint: this.endBullet.midpoint
        });
        this.add(this.startBullet);
        this.add(this.endBullet);
        this.add(this.linkLine);
    }
}
//# sourceMappingURL=DependencyLink.js.map