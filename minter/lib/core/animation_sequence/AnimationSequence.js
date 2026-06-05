import { Mobject } from '../../core/mobjects/Mobject.js';
export class AnimationSequence extends Mobject {
    defaults() {
        return {
            animations: [],
            animationIndex: 0
        };
    }
    mutabilities() {
        return {
            animations: 'on_init'
        };
    }
    playAnimation(anim) {
        this[anim.mobjectName].animate(anim.args, anim.duration);
    }
    playNextAnimation() {
        if (this.animationIndex >= this.animations.length) {
            return;
        }
        this.playAnimation(this.animations[this.animationIndex]);
        this.animationIndex++;
    }
    onTap(e) {
        this.playNextAnimation();
    }
}
//# sourceMappingURL=AnimationSequence.js.map