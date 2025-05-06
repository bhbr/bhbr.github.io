import { Linkable } from '../../core/linkables/Linkable.js';
import { Scroll } from './Scroll.js';
import { Rectangle } from '../../core/shapes/Rectangle.js';
import { Color } from '../../core/classes/Color.js';
import { DraggingCreator } from '../../core/creators/DraggingCreator.js';
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
    }
    mutabilities() { return {}; }
}
export class LinkableNumberListBox extends NumberListBox {
    defaults() {
        return {
            inputProperties: [
                { name: 'value', displayName: null, type: 'Array<number>' },
                { name: 'nextEntry', displayName: 'next entry', type: 'number' },
            ],
            outputProperties: [
                { name: 'value', displayName: null, type: 'Array<number>' },
                { name: 'length', displayName: null, type: 'number' },
            ]
        };
    }
    length() {
        return this.list.length;
    }
    get nextEntry() {
        return undefined; // this.list[this.list.length - 1]
    }
    set nextEntry(newValue) {
        this.list.push(newValue);
        this.update();
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