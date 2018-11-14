export default class Vec2 {
	/**
	 * 二维向量类
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.norm = Vec2.getNorm(x, y);
		this.angle = Vec2.getAngleWithX(x, y);
	}

	static AG = 180 / Math.PI;
	static getNorm = (x, y) => {
		return Math.sqrt(x * x + y * y);
	};

	/**
	 * @param {Number} x - x坐标
	 * @param {Number} y - y坐标
	 * @param {Boolean} isAcute - 是否取锐角
	 */
	static getAngleWithX = (x, y, isAcute) => {
		let angle = Math.atan2(y, x);
		if (!isAcute) {
			return angle;
		}
		if (angle > Math.PI / 2) {
			return Math.PI - angle;
		}
		if (angle < -Math.PI / 2) {
			return angle - Math.PI;
		}
		return angle;
	};

	/**
	 * 向量加法
	 * @param {Vec2} vec
	 */
	addWith(vec) {
		return new Vec2(this.x + vec.x, this.y + vec.y);
	}

	/**
	 * 向量减法
	 * @param {Vec2} vec
	 */
	subWith(vec) {
		return new Vec2(this.x - vec.x, this.y - vec.y);
	}

	/**
	 * 向量乘法
	 * @param {Vec2} vec
	 */
	dotWith(vec) {
		return this.x * vec.x + this.y * vec.y;
	}

	/**
	 * 数乘
	 * @param {Number} n
	 */
	multWith(n) {
		return new Vec2(this.x * n, this.y * n);
	}
	
	/**
	 * 去向量与X轴的夹角
	 * @param {Boolean} isAcute 是否取锐角
	 */
	angleWithX(isAcute){
		return Vec2.getAngleWithX(this.x,this.y,isAcute);
	}
}
