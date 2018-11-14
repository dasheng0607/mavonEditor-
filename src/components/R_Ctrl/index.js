import Box from "../../render/charten-tanram/components/box";
export default class Ctrl extends Box {
	constructor(props) {
		super(props);
		this.isIgnore = false;
		this.cursor = "pointer";
	}
	bindTarget(target = null, position = [0, 0]) {
		if (!target) {
			return;
		}
		this.target = target;
		this.position = position;
		this.update();
	}

	unbind() {
		this.target = undefined;
	}

	update() {
		if (!this.target) {
			return;
		}
		if (!Array.isArray(this.position)) {
			return;
		}
		let { x, y, cx, cy, w, h, s, r } = this.target;
		let coord = this.transform(
			x + w * this.position[0],
			y + h * this.position[1],
			cx,
			cy,
			r,
			s,
			s
		);

		this.setProps({
			x: coord[0] - 5,
			y: coord[1] - 5,
			w: 10,
			h: 10
		});
	}

	transform(x, y, tx, ty, r, sx, sy) {
		var deg = r * Math.PI / 180;
		if (!sy) sy = 1;
		if (!sx) sx = 1;
		return [
			sx * ((x - tx) * Math.cos(deg) - (y - ty) * Math.sin(deg)) + tx,
			sy * ((x - tx) * Math.sin(deg) + (y - ty) * Math.cos(deg)) + ty
		];
	}

	/**@param {CanvasRenderingContext2D} ctx*/
	render(ctx) {
		if (!this.target) {
			return;
		}
		this.update();
		ctx.save();
		ctx.fillStyle="rgba(0,0,0,.5)"
		ctx.fillRect(this.rx, this.ry, this.w, this.h);
		ctx.restore();
	}
}
