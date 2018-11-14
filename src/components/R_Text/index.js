import Box from "../../render/charten-tanram/components/box";
export default class Text extends Box {
	constructor(props) {
		super(props);
		const {
			text,
			fontSize,
			fontFamily,
			name,
			type,
			color,
			select,
			background,
		} = props;
		this.isIgnore=false;
		this.type = type;
		this.name = name;
		if (select) this.select = select;
		this.text = text;
		this.fontSize = fontSize;
		this.fontFamily = fontFamily;
		this.color = color;
		this.background = background;
		this.textAlign = "start";
		this.textBaseLine = "middle";
	}
	setProps({ ...props }) {
		if (!this.renderer) {
			return
		}
		let h = props.fontSize||this.fontSize;
		this.renderer.ctx.save();
		this.renderer.ctx.font = `${h}px ${props.fontFamily||this.fontFamily}`;
		let w = this.renderer.ctx.measureText(props.text||this.text).width;
		this.renderer.ctx.restore();
		let { x, y } = Object.assign(this, props, { w, h });

		this.cx = x + w / 2; //中心位置x
		this.cy = y + h / 2; //中心位置y
		this.rx = x - this.cx; //旋转后位置x
		this.ry = y - this.cy; //旋转后位置y
	}

	/**@param {CanvasRenderingContext2D} ctx*/
	render(ctx) {
		ctx.save();
		ctx.font = `${this.fontSize}px ${this.fontFamily}`;
		ctx.fillStyle = this.background;
		ctx.fillRect(this.rx, this.ry, this.w, this.h);
		ctx.fillStyle = this.color;
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseLine;
		ctx.fillText(
			this.text,
			this.rx,//+this.w/2,
			this.ry+this.h/2
		);
		ctx.restore();
	}
}
