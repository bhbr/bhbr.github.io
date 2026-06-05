import { isVertex, isVertexArray, vertexInterpolate, vertexArrayInterpolate } from '../../core/functions/vertex.js';
import { Transform } from '../../core/classes/Transform.js';
import { Color } from '../../core/classes/Color.js';
import { copy } from '../../core/functions/copying.js';
import { ExtendedObject } from '../../core/classes/ExtendedObject.js';
export class Motor extends ExtendedObject {
    defaults() {
        return {
            animationTimeStart: null,
            animationDuration: null,
            animationInterval: null,
            animationStartArgs: {},
            animationStopArgs: {},
            showShadow: null
        };
    }
    static isAnimatable(args) {
        for (let [key, value] of Object.entries(args)) {
            if ((typeof value == 'number')
                || isVertex(value)
                || isVertexArray(value)
                || value instanceof Transform
                || value instanceof Color) {
                continue;
            }
            else {
                console.error(`Property ${key} on ${this.constructor.name} is not animatable`);
                return false;
            }
        }
        return true;
    }
    animate(args = {}, seconds, showShadow = false) {
        // Calling this method launches an animation
        if (!Motor.isAnimatable(args)) {
            return;
        }
        for (let key of Object.keys(args)) {
            let a = this.mobject[key];
            let b = copy(a);
            this.animationStartArgs[key] = b;
        }
        this.animationStopArgs = args;
        // all times in ms bc that is what setInterval and setTimeout expect
        let dt = 10;
        this.animationTimeStart = Date.now();
        this.animationDuration = seconds * 1000;
        this.showShadow = showShadow;
        if (!this.showShadow) {
            this.mobject.hideShadow();
        }
        this.animationInterval = window.setInterval(function () {
            this.updateAnimation(Object.keys(args));
        }
            .bind(this), dt);
        // this.animationInterval is a reference number
        // that we need to remember to stop the animation
        window.setTimeout(this.cleanupAfterAnimation
            .bind(this), this.animationDuration);
    }
    updateAnimation(keys) {
        // This method gets called at regular intervals during the animation
        let weight = (Date.now() - this.animationTimeStart) / this.animationDuration;
        let newArgs = this.interpolatedAnimationArgs(keys, weight);
        this.mobject?.update(newArgs, true);
    }
    interpolatedAnimationArgs(keys, weight) {
        /*
        Compute a convex combination between the start and stop values
        of each key. The custom types (all except number) all have
        their own interpolation method.
        */
        let returnValues = {};
        for (let key of keys) {
            let startValue = this.animationStartArgs[key];
            let stopValue = this.animationStopArgs[key];
            if (typeof startValue == 'number') {
                returnValues[key] = (1 - weight) * startValue + weight * stopValue;
            }
            else if (isVertex(startValue)) {
                returnValues[key] = vertexInterpolate(startValue, stopValue, weight);
            }
            else if (isVertexArray(startValue)) {
                returnValues[key] = vertexArrayInterpolate(startValue, stopValue, weight);
            }
            else if (startValue instanceof Transform) {
                returnValues[key] = startValue.interpolate(stopValue, weight);
            }
            else if (startValue instanceof Color) {
                returnValues[key] = startValue.interpolate(stopValue, weight);
            }
        }
        return returnValues;
    }
    cleanupAfterAnimation() {
        // This method gets called at the end of the animation
        window.clearInterval(this.animationInterval);
        this.mobject.update(this.animationStopArgs);
        if (!this.showShadow) {
            this.mobject.showShadow();
        }
        this.animationInterval = null;
        this.animationStartArgs = {};
        this.animationStopArgs = {};
        this.showShadow = null;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Motor.js.map