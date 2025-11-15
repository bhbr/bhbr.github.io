import { Dependency } from '../../core/mobjects/Dependency.js';
import { Line } from '../../core/shapes/Line.js';
import { Mobject } from '../../core/mobjects/Mobject.js';
import { LinkBullet } from './LinkBullet.js';
import { LINK_LINE_WIDTH } from './constants.js';
import { ScreenEventHandler } from '../../core/mobjects/screen_events.js';
import { Color } from '../../core/classes/Color.js';
export class DependencyLink extends Mobject {
    defaults() {
        return {
            dependency: new Dependency(),
            startBullet: new LinkBullet(),
            endBullet: new LinkBullet(),
            startHook: null,
            endHook: null,
            previousHook: null,
            linkLine: new Line({ strokeWidth: LINK_LINE_WIDTH }),
            borderLinkLine: new Line({
                strokeWidth: LINK_LINE_WIDTH + 4,
                strokeColor: Color.black()
            }),
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
        this.startBullet.addDependency('midpoint', this.borderLinkLine, 'startPoint');
        this.linkLine.update({
            startPoint: this.startBullet.midpoint
        });
        this.borderLinkLine.update({
            startPoint: this.startBullet.midpoint
        });
        this.endBullet.addDependency('midpoint', this.linkLine, 'endPoint');
        this.endBullet.addDependency('midpoint', this.borderLinkLine, 'endPoint');
        this.linkLine.update({
            endPoint: this.endBullet.midpoint
        });
        this.borderLinkLine.update({
            endPoint: this.endBullet.midpoint
        });
        this.add(this.borderLinkLine);
        this.add(this.startBullet);
        this.add(this.endBullet);
        this.add(this.linkLine);
    }
}
//# sourceMappingURL=DependencyLink.js.map