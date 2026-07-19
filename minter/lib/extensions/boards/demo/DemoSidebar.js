import { Sidebar } from '../../../core/Sidebar.js';
import { DragButton } from '../../../core/sidebar_buttons/DragButton.js';
import { LinkButton } from '../../../core/sidebar_buttons/LinkButton.js';
import { ControlsButton } from '../../../core/sidebar_buttons/ControlsButton.js';
import { CoinButton } from '../../../extensions/boards/coin-flip/CoinButton.js';
import { StraitButton } from '../../../extensions/boards/construction/straits/StraitButton.js';
import { NumberButton } from '../../../extensions/sidebar_buttons/NumberButton.js';
import { ArithmeticButton } from '../../../extensions/sidebar_buttons/ArithmeticButton.js';
import { ComparisonButton } from '../../../extensions/sidebar_buttons/ComparisonButton.js';
import { WavyButton } from '../../../extensions/creations/Wavy/WavyButton.js';
import { SwingButton } from '../../../extensions/creations/Swing/SwingButton.js';
import { ColorSampleButton } from '../../../extensions/creations/ColorSample/ColorSampleButton.js';
import { PolypadButton } from '../../../extensions/creations/Polypad/PolypadButton.js';
import { AlgebraButton } from '../../../extensions/sidebar_buttons/AlgebraButton.js';
export class DemoSidebar extends Sidebar {
    defaults() {
        return {
            availableButtonClasses: [
                DragButton,
                LinkButton,
                ControlsButton,
                AlgebraButton,
                CoinButton,
                //				ConButton,
                //				ConCircleButton,
                ComparisonButton,
                PolypadButton,
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
                new ControlsButton(),
                //new ConButton(),
                new CoinButton(),
                new NumberButton(),
                new ArithmeticButton(),
                new AlgebraButton(),
                new ComparisonButton(),
                new PolypadButton(),
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
let s = new DemoSidebar();
//# sourceMappingURL=DemoSidebar.js.map