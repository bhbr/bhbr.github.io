import { Sidebar } from '../../../core/Sidebar.js';
import { DragButton } from '../../../core/sidebar_buttons/DragButton.js';
import { LinkButton } from '../../../core/sidebar_buttons/LinkButton.js';
import { ExtendedBoardButton } from '../../../extensions/sidebar_buttons/ExtendedBoardButton.js';
import { BoardButton } from '../../../core/sidebar_buttons/BoardButton.js';
import { StraitButton } from '../../../extensions/boards/construction/straits/StraitButton.js';
import { ConCircleButton } from '../../../extensions/boards/construction/ConCircle/ConCircleButton.js';
import { NumberButton } from '../../../extensions/sidebar_buttons/NumberButton.js';
import { ArithmeticButton } from '../../../extensions/sidebar_buttons/ArithmeticButton.js';
import { WavyButton } from '../../../extensions/creations/Wavy/WavyButton.js';
import { SwingButton } from '../../../extensions/creations/Swing/SwingButton.js';
import { ColorSampleButton } from '../../../extensions/creations/ColorSample/ColorSampleButton.js';
export class DemoSidebar extends Sidebar {
    defaults() {
        return {
            availableButtonClasses: [
                DragButton,
                LinkButton,
                BoardButton,
                ExtendedBoardButton,
                ConCircleButton,
                StraitButton,
                NumberButton,
                ArithmeticButton,
                WavyButton,
                SwingButton,
                ColorSampleButton
            ],
            buttons: [
                new DragButton(),
                new LinkButton(),
                new ExtendedBoardButton(),
                new NumberButton(),
                new ArithmeticButton(),
                new WavyButton(),
                new SwingButton(),
                new ColorSampleButton()
            ],
        };
    }
    mutabilities() {
        return {
            availableButtonClasses: 'never'
        };
    }
}
//# sourceMappingURL=DemoSidebar.js.map