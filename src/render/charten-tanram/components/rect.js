import Box from "./box";

export default class Rect extends Box{
	/**@param {CanvasRenderingContext2D} ctx */
	render(ctx){
		ctx.save();
		ctx.fillStyle=`rgba(${this.borderColor},.5)`
		ctx.fillRect(this.rx,this.ry,this.w,this.h)
		ctx.restore();
	}
}