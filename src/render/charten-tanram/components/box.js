export default class Box{
    constructor({
        x=0,
        y=0,
        w=0,
        h=0,
		// r=0,
		// s=1,
		borderColor=[255,0,0],
		isIgnore=true
    }){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
		// this.r=r;
		// this.s=s;
        // this.setProps({ x, y, w, h, r });
        this.setProps({x,y,w,h});
        this.borderColor=borderColor.join(',');

		this.isFocus=false;
		this.isIgnore=isIgnore

    }

    focus(){
        this.isFocus=true;
    }

    blur(){
        this.isFocus=false;
    }

    setRenderer(renderer){
        this.renderer=renderer;
    }

    setProps(props){
        let {x,y,w,h}=Object.assign(this,props);
        this.cx=x+w/2;//中心位置x
        this.cy=y+h/2;//中心位置y
        this.rx=x-this.cx;//旋转后位置x
        this.ry=y-this.cy//旋转后位置y
    }


    /**@param {CanvasRenderingContext2D} ctx */
    draw(ctx){
        ctx.save();
        ctx.translate(this.cx,this.cy);
		ctx.rotate(this.r*this.renderer.DEG);
        ctx.scale(this.s,this.s);
        typeof this.render ==='function'&&this.render(ctx);
        this.isFocus&&typeof this.renderFocus === 'function' && this.renderFocus(ctx);
        ctx.restore();
    }
}