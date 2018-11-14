import Tangram from "./charten-tanram/index.js";
import TranslateAct from "./actions/translateAct";
import Ctrl from "../components/R_Ctrl";

export default function() {
	const Vec2 = Tangram.Vec2;
	const renderer = new Tangram.Renderer(this.refs.cvs);
	const translateAct = new TranslateAct(renderer);
	const {
		onUpdate = () => null,
		onFocus = () => null,
		index = 0,
		list = []
	} = this.props;
	const ctrls = new Array(5).fill(1).map(item => new Ctrl({}));
	const ctrlsPos = [[0, 0], [0, 1], [1, 0], [1, 1], [0.5, -0.5]];

	/**@action 控制器开始 */
	const onctrlStar = (e, cur, focusTarget) => {
		cur.isStart = true;
		cur.lastVec = new Vec2(
			e.offsetX - focusTarget.cx,
			e.offsetY - focusTarget.cy
		);
	};

	/**@action 控制器移动 */
	const onctrlMove = (e, cur, focusTarget) => {
		if (!cur.isStart) {
			return;
		}
		const vec = new Vec2(
			e.offsetX - focusTarget.cx,
			e.offsetY - focusTarget.cy
		);
		const ds = (vec.norm - cur.lastVec.norm) / cur.lastVec.norm;
		const s = focusTarget.s + ds;
		focusTarget.setProps({ s });
		cur.lastVec = vec;
	};

	/**@action 控制器移动结束 */
	const onctrlEnd = (e, cur, focusTarget) => {
		if (!cur.isStart) {
			return;
		}
		cur.isStart = false;
		cur.lastVec = undefined;
	};

	/**@action 旋转控制器开始 */
	const onRotateStar = (e, cur, focusTarget) => {
		cur.isStart = true;
	};

	/**@action 旋转控制器移动 */
	const onRotateMove = (e, cur, focusTarget) => {
		if (!cur.isStart) {
			return;
		}
		focusTarget.setProps({
			r:new Vec2(e.offsetX-focusTarget.cx,e.offsetY-focusTarget.cy).angle*Vec2.AG+90
		})
	};

	/**@action 旋转控制器结束 */
	const onRotateEnd = (e, cur, focusTarget) => {
		if (!cur.isStart) {
			return;
		}
		cur.isStart = false;
	};

	let focusTarget = list[index];
	let ctrlTarget = null;

	ctrls[4].isRotate=true;

	renderer.onPropsUpdate = nextProps => {
		if (nextProps.list !== this.props.list) {
			renderer.setList([...nextProps.list, ...ctrls]);
		}

		if (
			nextProps.index !== this.props.index ||
			nextProps.list !== this.props.list
		) {
			const { list: _list = [], index: _index = 0 } = nextProps;
			focusTarget = _list[_index];
			ctrls.forEach((item, i) => item.bindTarget(focusTarget, ctrlsPos[i]));
		}
	};

	renderer.on("click", e => {
		let target = renderer.getTarget(e.offsetX, e.offsetY);
		if (target && target.type) {
			onUpdate();
			onFocus(target);
		}
	});
	renderer.on("mousedown", e => {
		if (!focusTarget) {
			return;
		}

		let target = renderer.getTarget(e.offsetX, e.offsetY);

		if (target && target.cursor) {
			ctrlTarget = target;
			const handle=ctrlTarget.isRotate?onRotateStar:onctrlStar;
			handle(e, ctrlTarget, focusTarget)
		} else {
			translateAct.onStart(e, focusTarget);
		}
	});

	renderer.on("mousemove", e => {
		e.preventDefault();
		if (!focusTarget) {
			return;
		}
		if (ctrlTarget) {
			const handle=ctrlTarget.isRotate?onRotateMove:onctrlMove;
			handle(e, ctrlTarget, focusTarget)
			return;
		}
		translateAct.onMove(e);
		onUpdate();
	});

	renderer.on("mousemove", e => {
		if(ctrlTarget&&ctrlTarget.isStart){
			return
		}
		let target = renderer.getTarget(e.offsetX, e.offsetY);
		if (target && target.cursor) {
			renderer.cvs.style.cursor = target.cursor;
		} else if (target && target.type) {
			renderer.cvs.style.cursor = "move";
		} else {
			renderer.cvs.style.cursor = "default";
		}
	});

	renderer.on("mouseup", e => {
		if (focusTarget) {
			translateAct.onEnd(e);
			onUpdate();
		}
		if (ctrlTarget) {
			const handle=ctrlTarget.isRotate?onRotateEnd:onctrlEnd;
			handle(e, ctrlTarget, focusTarget)
			ctrlTarget = null;
			return;
		}
	});

	renderer.start();

	return renderer;
}
