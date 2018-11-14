import Act from "./base";
import Vec2 from "../utils/vec2";

export default class TransformAct extends Act {
    constructor(props, options={}) {
        super(props);
        this.maxScale = options.maxScale || 1.5;
        this.minScale = options.minScale || 0.5;
    }

    /**
     * @param {TouchEvent} e
     * @return {Vec2} Vec2
     */
    setVec(e) {
        return new Vec2(
            e.touches[0].pageX - e.touches[1].pageX,
            e.touches[0].pageY - e.touches[1].pageY
        );
    }

    /**@param {TouchEvent} e */
    onStart(e, target = null) {
        if (!target) {
            return;
        }
        if (e.touches.length < 2) {
            return;
        }
        this.setTarget(target);
        this.lastVec = this.setVec(e);
        this.isStart = true;
        return;
    }

    /**@param {TouchEvent} e*/
    onMove(e) {
        if (!this.isStart) {
            return;
        }
        if (e.touches.length < 2) {
            return;
        }
        e.preventDefault();
        const vec = this.setVec(e);
        const dAngle = (vec.angleWithX() - this.lastVec.angleWithX()) * Vec2.AG;
        const ds = (vec.norm - this.lastVec.norm) / this.lastVec.norm;
        let s = this.target.s + ds;
        if (s > this.maxScale) {
            s = this.maxScale;
        }
        if (s < this.minScale) {
            s = this.minScale;
        }

        Math.abs(dAngle) < 90 &&
            this.target.setProps({
                r: this.target.r + dAngle,
                s
            });

        this.lastVec = vec;
        return true;
    }

    onEnd() {
        if (!this.isStart) {
            return;
        }
        this.isStart = false;
        this.init();
        this.lastVec = undefined;
    }
}
