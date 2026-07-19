import { ScreenEventHandler } from '../../../core/mobjects/screen_events.js';
import { Mobject } from '../../../core/mobjects/Mobject.js';
import { Linkable } from '../../../core/linkables/Linkable.js';
import { PlayButton } from '../../../extensions/ui/PlayButton/PlayButton.js';
import { Rectangle } from '../../../core/shapes/Rectangle.js';
export class CindyCanvas extends Linkable {
    defaults() {
        return {
            port: {
                transform: [{
                        visibleRect: [0, 1, 1, 0]
                    }]
            },
            innerCanvas: new Mobject(),
            outerFrame: new Rectangle(),
            playButton: new PlayButton({
                anchor: [5, -50]
            }),
            id: `Cindy-${Date.now()}`,
            screenEventHandler: ScreenEventHandler.Self,
            playedOnce: false,
            playState: 'stop',
            drawBorder: true,
            core: null
            /*
            core has no default because it is read-only and
            will be created in cindySetup as a CindyJS instance
            with state-dependent arguments
            */
        };
    }
    mutabilities() {
        return {
            port: 'never',
            innerCanvas: 'never',
            outerFrame: 'never',
            playButton: 'never',
            id: 'on_init'
        };
    }
    setup() {
        super.setup();
        this.innerCanvas.view.frame.update({
            width: this.view.frame.width,
            height: this.view.frame.height
        });
        this.innerCanvas.update({
            screenEventHandler: ScreenEventHandler.Auto
        });
        this.innerCanvas.view.div.style['pointer-events'] = 'auto';
        this.innerCanvas.view.div.id = this.id;
        this.add(this.innerCanvas);
        this.outerFrame.update({
            width: this.view.frame.width,
            height: this.view.frame.height,
            screenEventHandler: ScreenEventHandler.Parent
        });
        this.add(this.outerFrame);
        Object.assign(this.port, {
            id: this.id,
            width: this.view.frame.width,
            height: this.view.frame.height,
            started: false
        });
        this.controls.add(this.playButton);
        this.playButton.update({
            mobject: this
        });
        this.createScripts();
        this.startCore();
    }
    createScripts() {
        this.createInitScript();
        this.createDrawScript();
        this.createMouseMoveScript();
    }
    createInitScript() {
        let initScript = document.createElement('script');
        initScript.setAttribute('type', 'text/x-cindyscript');
        initScript.setAttribute('id', `${this.id}init`);
        initScript.textContent = this.initCode();
        document.body.appendChild(initScript);
    }
    createDrawScript() {
        let drawScript = document.createElement('script');
        drawScript.setAttribute('type', 'text/x-cindyscript');
        drawScript.setAttribute('id', `${this.id}draw`);
        drawScript.textContent = this.drawCode();
        document.body.appendChild(drawScript);
    }
    createMouseMoveScript() {
        let mouseMoveScript = document.createElement('script');
        mouseMoveScript.setAttribute('type', 'text/x-cindyscript');
        mouseMoveScript.setAttribute('id', `${this.id}mousemove`);
        mouseMoveScript.textContent = this.mouseMoveCode();
        document.body.appendChild(mouseMoveScript);
    }
    initCode() {
        return `resetclock();`;
    }
    drawCode() {
        return `drawcmd();`;
    }
    mouseMoveCode() {
        // do not redraw until I say so
        return '';
    }
    play() {
        if (!this.core.started) {
            this.core.startup();
            this.core.started = true;
        }
        this.core.play();
        this.playState = 'play';
        this.outerFrame.update({
            screenEventHandler: ScreenEventHandler.Below
        });
    }
    pause() {
        this.core.pause();
        this.playState = 'pause';
        this.outerFrame.update({
            screenEventHandler: ScreenEventHandler.Parent
        });
    }
    togglePlayState() {
        if (this.playState == 'play') {
            this.pause();
        }
        else {
            this.play();
        }
    }
    stop() {
        this.core.stop();
        this.playState = 'stop';
        this.outerFrame.update({
            screenEventHandler: ScreenEventHandler.Self
        });
    }
    geometry() { return []; }
    setDragging(flag) {
        super.setDragging(flag);
        if (flag) {
            this.outerFrame.update({
                screenEventHandler: ScreenEventHandler.Parent
            });
        }
        else {
            this.outerFrame.update({
                screenEventHandler: ScreenEventHandler.Below
            });
        }
    }
    startCore() {
        this.core = CindyJS.newInstance({
            scripts: `${this.id}*`,
            animation: { autoplay: false },
            ports: [this.port],
            geometry: this.geometry()
        });
    }
    reload(args = {}) {
        let initScript = document.querySelector(`#${this.id}init`);
        initScript.textContent = this.initCode();
        let drawScript = document.querySelector(`#${this.id}draw`);
        drawScript.textContent = this.drawCode();
        let mouseMoveScript = document.querySelector(`#${this.id}mousemove`);
        mouseMoveScript.textContent = this.mouseMoveCode();
        this.startCore();
    }
}
//# sourceMappingURL=CindyCanvas.js.map