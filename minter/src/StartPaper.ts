
import { log } from './core/functions/logging'
//import { AllTests } from './_tests/allTests'
import { CoinFlipPaper } from './extensions/boards/coin-flip/CoinFlipPaper'
import { Coin } from './extensions/creations/CoinFlipper/Coin'
import { Transform } from './core/classes/Transform'
import { MathExpressionField } from './extensions/creations/MathExpressionField/MathExpressionField'
import { isTouchDevice, separateSidebar, ScreenEvent, ScreenEventHandler } from './core/mobjects/screen_events'
import { Rectangle } from './core/shapes/Rectangle'
import { Color } from './core/classes/Color'
import { NumberListBox } from './extensions/creations/math/boxes/NumberListBox'
import { NumberBox } from './extensions/creations/math/boxes/NumberBox'
import { AddBox } from './extensions/creations/math/boxes/BinaryOperatorBox'


export class StartPaper extends CoinFlipPaper { }

//AllTests.run()

export const paper = new StartPaper()


if (isTouchDevice && separateSidebar) {
	paper.background.view.div.style.backgroundColor = 'rgba(0, 0, 0, 1)'
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
	})

	let startTouchEvent = new TouchEvent('touchstart', {
		cancelable: true,
		bubbles: true,
		touches: [startTouch],
		targetTouches: [],
		changedTouches: [startTouch],
		shiftKey: true,
	})

	paper.view.div.dispatchEvent(startTouchEvent)

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
	})

	let touchEvent = new TouchEvent('touchmove', {
		cancelable: true,
		bubbles: true,
		touches: [touch],
		targetTouches: [],
		changedTouches: [touch],
		shiftKey: true,
	})

	paper.view.div.dispatchEvent(touchEvent)

}, 2000)
