import * as React from "react";
import { Form } from "antd";
import Unit from "./data";
export default class AttrSetting extends React.Component {
	constructor(props) {
		super(props);
		this.unitList = [
			"name",
			"x",
			"y",
			"w",
			"h",
			// "r",
			// "s",
			"text",
			"fontSize",
			// "fontFamily",
			"color",
			"select",
			// "background",
			// "src"
		];
	}
	onChange = (...p) => {
		const { onChange = () => null } = this.props;
		onChange(...p);
	};
	render() {
		const { target = {} } = this.props;
		//处理targin
		return (
			<div
				style={{
					paddingRight: 5
				}}>
				<Form layout="inline">
					{this.unitList.map((item, i) => {
						// 特殊属性处理
						if (!(item in target)) {
							return null;
						}
						const C = Unit[item];
						return (
							<C
								key={i}
								name={item}
								value={target[item]}
								onChange={this.onChange}
							/>
						);
					})}
				</Form>
			</div>
		);
	}
}
