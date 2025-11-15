import { Sidebar } from '../../../core/Sidebar.js';
import { DragButton } from '../../../core/sidebar_buttons/DragButton.js';
import { LinkButton } from '../../../core/sidebar_buttons/LinkButton.js';
import { ControlsButton } from '../../../core/sidebar_buttons/ControlsButton.js';
import { CoinButton } from './CoinButton.js';
import { ArithmeticButton } from '../../../extensions/sidebar_buttons/ArithmeticButton.js';
import { ComparisonButton } from '../../../extensions/sidebar_buttons/ComparisonButton.js';
import { AlgebraButton } from '../../../extensions/sidebar_buttons/AlgebraButton.js';
import { ListFunctionsButton } from '../../../extensions/sidebar_buttons/ListFunctionsButton.js';
import { PlotButton } from '../../../extensions/sidebar_buttons/PlotButton.js';
import { NumberButton } from '../../../extensions/sidebar_buttons/NumberButton.js';
import { ColorSampleButton } from '../../../extensions/creations/ColorSample/ColorSampleButton.js';
import { RestartButton } from '../../../core/sidebar_buttons/RestartButton.js';
export class CoinFlipSidebar extends Sidebar {
    defaults() {
        return {
            availableButtonClasses: [
                DragButton,
                LinkButton,
                ControlsButton,
                CoinButton,
                NumberButton,
                ArithmeticButton,
                ComparisonButton,
                AlgebraButton,
                ListFunctionsButton,
                PlotButton,
                ColorSampleButton,
                RestartButton
            ],
            buttons: [
                new DragButton(),
                new LinkButton(),
                new ControlsButton(),
                new CoinButton(),
                new NumberButton(),
                new ArithmeticButton(),
                new ComparisonButton(),
                new AlgebraButton(),
                new ListFunctionsButton(),
                new PlotButton(),
                new ColorSampleButton(),
                new RestartButton()
            ],
        };
    }
    mutabilities() {
        return {
            availableButtonClasses: 'never'
        };
    }
}
//# sourceMappingURL=CoinFlipSidebar.js.map