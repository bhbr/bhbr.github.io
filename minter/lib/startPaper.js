//import { AllTests } from './_tests/allTests'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper.js';
import { isTouchDevice, separateSidebar } from './core/mobjects/screen_events.js';
export class StartPaper extends CoinFlipPaper {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//AllTests.run()
export const paper = new StartPaper();
if (isTouchDevice && separateSidebar) {
    paper.background.view.div.style.backgroundColor = 'rgba(0, 0, 0, 1)';
}
window.setTimeout(function () {
    let startTouch = new Touch({
        identifier: Date.now(),
        target: paper.view.div,
        clientX: 100,
        clientY: 100,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5,
        touchType: 'stylus'
    });
    let startTouchEvent = new TouchEvent('touchstart', {
        cancelable: true,
        bubbles: true,
        touches: [startTouch],
        targetTouches: [],
        changedTouches: [startTouch],
        shiftKey: true,
    });
    paper.view.div.dispatchEvent(startTouchEvent);
    let touch = new Touch({
        identifier: Date.now(),
        target: paper.view.div,
        clientX: 200,
        clientY: 200,
        radiusX: 2.5,
        radiusY: 2.5,
        rotationAngle: 10,
        force: 0.5,
        touchType: 'stylus'
    });
    let touchEvent = new TouchEvent('touchmove', {
        cancelable: true,
        bubbles: true,
        touches: [touch],
        targetTouches: [],
        changedTouches: [touch],
        shiftKey: true,
    });
    paper.view.div.dispatchEvent(touchEvent);
}, 2000);
//# sourceMappingURL=startPaper.js.map