import Box from "../../render/charten-tanram/components/box";
const img=new Image();
export default class RImage extends Box {
	constructor(props) {
		super(props);
		const { src, type, name } = props;
		this.isIgnore = false;
		this.type = type;
        this.name = name;
        this.src = require('./img2.png');
	}

	/**@param {CanvasRenderingContext2D} ctx*/
	render(ctx) {
        if(this.src!==img.src){
            img.src=this.src;
        }
		ctx.save();
        try {
            ctx.drawImage(
                img,
                0,
                0,
                img.width,
                img.height,
                this.rx,
                this.ry,
                this.w,
                this.h
            );
        } catch (error) {
            ctx.fillStyle='#acacac'
            ctx.fillRect(this.rx,this.ry,this.w,this.h)
        }
		
		ctx.restore();
	}
}
