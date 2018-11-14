import createRGB from "./utils/createRGB";
import bindEvents from "./utils/bindEvents";
import Vec2 from "./utils/vec2";
import Box from "./components/box";
import Act from "./action/base";

class Renderer {
	/**
	 * 绘制工具
	 * @param {HTMLCanvasElement} cvs
	 */
	constructor(cvs) {
		this.cvs = cvs;
		this.ctx = cvs.getContext("2d");

		this.DEG = Math.PI / 180;

		this.colorIndexMap = {};
		this.eventsMap = {};
		this.list = [];
		this.itemIndex = 0;
		this.ts = new Date().getTime();
		this.focusTarget = null;
		this.isStart = false;
		window.renderer = this;

		const render = e => {
			requestAnimationFrame(e => {
				if (this.willRemove) {
					this.unbind && this.unbind();
					return;
				}

				if (!this.isStart) {
					render();
					return;
				}

				let ts = new Date().getTime();

				if (ts - this.ts > 25) {
					this.draw();
					this.ts = ts;
				}
				render();
			});
		};

		const initColorMap = e => {
			for (let i = 0; i < 1758; i++) {
				this.colorIndexMap[createRGB(i).join(",")] = i;
			}
		};

		this.unbind = bindEvents(this);
		render();
		initColorMap();
	}

	px2coord(x = 0, y = 0) {
		return {
			x: x * this.w / this.cvs.offsetWidth,
			y: y * this.h / this.cvs.offsetHeight
		};
	}

	setSize(w = 0, h = 0) {
		this.w = this.cvs.width = w;
		this.h = this.cvs.height = h;
	}

	setList(list = []) {
		this.list = [];
		list.forEach((item, i) => {
			if (i > 1758) return;
			this.list[i] = item;
			this.list[i].setRenderer(this);
		});
	}

	setFocusTarget(x, y) {
		const target = this.getTarget(x, y);
		this.focusTarget && this.focusTarget.blur();
		if (target) {
			this.focusTarget = target;
			this.focusTarget.focus();
		} else {
			this.focusTarget = null;
		}
	}

	getTarget(x = 0, y = 0) {
		if (this.w === 0 || this.h === 0) {
			return;
		}
		if (x > this.w || y > this.h) {
			return;
		}
		if (x < 0 || y < 0) {
			return;
		}

		try {
			this.stop();
			this.ctx.clearRect(0, 0, this.w, this.h);
			this.drawColorIndex();
			const data = this.ctx.getImageData(0, 0, x, y).data;
			const i = data.length - 4;
			const color = [data[i], data[i + 1], data[i + 2]];
			const target = this.list[this.colorIndexMap[color.join(",")]];
			this.draw();
			this.start();
			return target;
		} catch (error) {
            this.draw();
            this.start();
            return 
        }
	}

	on(eventName, handle) {
		if (typeof handle !== "function") {
			return;
		}
		if (Array.isArray(this.eventsMap[eventName])) {
			this.eventsMap[eventName].push(handle);
		} else {
			this.eventsMap[eventName] = [handle];
		}
	}

	/**绘制颜色索引 */
	drawColorIndex() {
		const ctx = this.ctx;

		Object.keys(this.colorIndexMap).find((item, i) => {
			if (i > this.list.length) {
				return true;
			}
			let index = this.colorIndexMap[item];
			if (!this.list[index]) {
				return false;
			}
			if (this.list[index].isIgnore) {
				return false;
			}
			let { rx = 0, ry = 0, w = 0, h = 0, r = 0, cx = 0, cy = 0,s=1 } = this.list[
				index
			];
			ctx.save();
			ctx.translate(cx, cy);
			ctx.rotate(r * this.DEG);
			ctx.scale(s,s);
			ctx.fillStyle = `rgb(${item})`;
			ctx.fillRect(rx, ry, w, h);
			ctx.restore();
			return false;
		});
	}

	/**绘制 */
	draw() {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.w, this.h);
		ctx.save();
		this.list.forEach(item => {
			typeof item.draw === "function" && item.draw(ctx);
		});
		ctx.restore();
	}

	start() {
		this.isStart = true;
	}

	stop() {
		this.isStart = false;
	}

	destroy() {
		this.willRemove = true;
		this.unbind && this.unbind();
	}
}

export default {
	Renderer,
	Vec2,
	Box,
	Act
};
