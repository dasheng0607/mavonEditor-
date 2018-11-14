import Act from "./base";
export default class TranslateAct extends Act {
    setBeginCoord(x, y) {
        this.begin = { x, y };
    }

    /**@param {TouchEvent} e */
    onStart(e, target = null) {
        if (!target) {
            return;
        }
        if (e.touches.length > 1) {
            return;
        }
        this.isStart = true;
        this.setTarget(target);
        const coord = this.renderer.px2coord(
            e.touches[0].pageX,
            e.touches[0].pageY
        );
        this.setBeginCoord(coord.x, coord.y);
    }

    /**@param {TouchEvent} e */
    onMove(e, scaleX = 1, scaleY = 1) {
        if (!this.isStart) {
            return false;
        }
        if (e.touches.length > 1) {
            return;
        }
        e.preventDefault();
        const { x, y } = this.renderer.px2coord(
            e.touches[0].pageX,
            e.touches[0].pageY
        );
        const dx = (x - this.begin.x) / scaleX + this.state.x;
        const dy = (y - this.begin.y) / scaleY + this.state.y;
        this.target.setProps({
            x: dx,
            y: dy
        });
        return true;
    }

    onEnd(e) {
        if (!this.isStart) {
            return;
        }
        this.init();
        this.begin = undefined;
    }
}
