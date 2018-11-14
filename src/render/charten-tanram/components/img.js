import Box from "./box";
export default class Img extends Box {
	constructor(props) {
		super(props);
		this.src = props.src;
		this.img = new Image();
		this.img.onload = e => {
			this.setProps({
				w: this.img.width,
				h: this.img.height
			});
		};
		this.img.src = this.src;
	}

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 */
	render(ctx) {
		ctx.save();
		this.w !== 0 &&
			ctx.drawImage(
				this.img,
				0,
				0,
				this.img.width,
				this.img.height,
				this.rx,
				this.ry,
				this.w,
				this.h
			);
		ctx.restore();
	}
}
