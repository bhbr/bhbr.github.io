import { Linkable } from '../../core/linkables/Linkable.js';
import { Scroll } from './Scroll.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
import { Color } from '../../core/classes/Color.js';
import { DraggingCreator } from '../../core/creators/DraggingCreator.js';
import { SimpleButton } from '../../core/mobjects/SimpleButton.js';
export class NumberListBox extends Linkable {
    defaults() {
        return {
            background: new Rectangle({
                fillColor: Color.black(),
                fillOpacity: 1
            }),
            scroll: new Scroll(),
            frameWidth: 80,
            frameHeight: 200,
            value: [],
            preventDefault: false
        };
    }
    get list() { return this.value; }
    set list(newValue) { this.value = newValue; }
    setup() {
        super.setup();
        this.background.update({
            width: this.view.frame.width,
            height: this.view.frame.height
        });
        this.add(this.background);
        this.scroll.update({
            frameWidth: this.view.frame.width,
            frameHeight: this.view.frame.height,
            list: this.list
        });
        this.add(this.scroll);
        this.scroll.view.div.style.fontSize = '20px';
        this.scroll.view.div.style.color = Color.white().toCSS();
    }
    update(args = {}, redraw = true) {
        super.update(args, redraw);
        this.scroll.update({
            width: this.view.frame.width,
            height: this.view.frame.height,
            list: this.list
        }, redraw);
        this.scroll.view.div.style['overflow-y'] = 'auto';
    }
    startDragging(e) {
        super.startDragging(e);
        this.preventDefault = true;
        this.scroll.preventDefault = true;
    }
    endDragging(e) {
        super.endDragging(e);
        this.preventDefault = false;
        this.scroll.preventDefault = false;
    }
    clear() {
        this.update({
            value: []
        });
    }
    mutabilities() { return {}; }
}
export class LinkableNumberListBox extends NumberListBox {
    defaults() {
        return {
            inputProperties: [
                { name: 'value', displayName: 'list', type: 'Array<number>' },
                { name: 'newestEntry', displayName: 'newest', type: 'number' },
            ],
            outputProperties: [
                { name: 'value', displayName: 'list', type: 'Array<number>' },
                { name: 'length', displayName: null, type: 'number' },
            ],
            clearButton: new SimpleButton({
                text: 'clear'
            })
        };
    }
    length() {
        return this.list.length;
    }
    get newestEntry() {
        return undefined; // this.list[this.list.length - 1]
    }
    set newestEntry(newValue) {
        this.list.push(newValue);
        this.update();
    }
    setup() {
        super.setup();
        this.clearButton.update({
            anchor: [20, this.frameHeight + 10]
        });
        this.clearButton.action = this.clear.bind(this);
        this.add(this.clearButton);
    }
    mutabilities() { return {}; }
}
export class NumberListBoxCreator extends DraggingCreator {
    createMobject() {
        return new LinkableNumberListBox({
            anchor: this.getStartPoint()
        });
    }
    updateFromTip(q, redraw = true) {
        super.updateFromTip(q, redraw);
        this.creation.hideLinks();
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=NumberListBox.js.map