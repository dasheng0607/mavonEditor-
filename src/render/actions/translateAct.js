import Base from "../charten-tanram/action/base";
export default class TransalteAct extends Base {
	setBeginCoord(x, y) {
		this.begin = { x, y };
	}

	/**@param {MouseEvent} e */
	onStart(e, target = null) {
		if (!target) {
			return;
		}
		this.isStart = true;
		this.setTarget(target);
		const coord = this.renderer.px2coord(e.offsetX, e.offsetY);
		this.setBeginCoord(coord.x, coord.y);
	}

	/**@param {MouseEvent} e */
	onMove(e, scaleX = 1, scaleY = 1) {
		if (!this.isStart) {
			return false;
		}
		e.preventDefault();
		const { x, y } = this.renderer.px2coord(
			e.offsetX,
			e.offsetY
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
