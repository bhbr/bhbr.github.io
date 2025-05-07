import { CoinFlipSidebar } from './extensions/boards/coin-flip/CoinFlipSidebar.js';
export class StartSidebar extends CoinFlipSidebar {
    defaults() { return {}; }
    mutabilities() { return {}; }
}
export const sidebar = new StartSidebar();