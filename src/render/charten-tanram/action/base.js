export default class Action {
    constructor(renderer){
        this.renderer=renderer;
        this.init()
    }
    init(){
        this.target=null;
        this.isStart=false;
        this.state={
            x:0,
            y:0,
            w:0,
            h:0,
			r:0,
			s:0,
            cx:0,
            cy:0,
            rx:0,
			ry:0
        }
    }
    setTarget(target){
        const {x,y,w,h,r,cx,cy,rx,ry,s}=target;
        this.state={x,y,w,h,r,cx,cy,rx,ry,s};
        this.target=target;
    }
}