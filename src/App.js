import React, { Component } from "react";
import { Button } from "antd";
import Panel from "./components/Panel";
import Editor from "./components/Editor";
import View from "./components/View";
import UnitList from "./components/UnitList";
import AttrSetting from "./components/AttrSetting";
import RText from "./components/R_Text";
import RImage from "./components/R_Image";
import RImage2 from "./components/R_Image/index2";

import "./styles/app.css";
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			focusIndex: 0,
			btnShow:{
				qrCode:true,
				barCode:true,
				text1: true,
				text2: true,
				text3:true,
			}
		};
		this.dealIndex = this.dealIndex.bind(this);
	}
	onCreateText = data => this.createComponent("text", data);
	onCreateImage = data => this.createComponent("image", data);
	onCreateImage2 = data => this.createComponent("image2", data);
	onClickItem = (item, i) => this.setState({ focusIndex: i });
	onChangeTarget = (name, value) => {
		const list = [...this.state.list];
		list[this.state.focusIndex].setProps({
			[name]: value
		});
		this.setState({ list });
	};
	onUpdateEdt = () => this.updateList();
	onEdtHasFocus = target => this.updateFocusIndexByEdt(target);
	onSubmit = () => this.submit();
	componentDidMount() {}
	render() {
		return (
			<View>
				<div className="Edt-page flex flex-t">
					<aside style={{ width: 300 }}>
						<Panel title="属性">
							<AttrSetting
								target={this.state.list[this.state.focusIndex]}
								onChange={this.onChangeTarget}
							/>
						</Panel>
					</aside>
					<section className="flex-item">
						<Panel title="模块">
							<Editor
								list={this.state.list}
								index={this.state.focusIndex}
								onCreateText={this.onCreateText}
								onCreateImage={this.onCreateImage}
								onCreateImage2={this.onCreateImage2}
								onChange={this.onChangeTarget}
								onUpdate={this.onUpdateEdt}
								onFocus={this.onEdtHasFocus}
								btnShow={this.state.btnShow}
								onClickItem={this.onClickItem}
							/>
							<Button type="primary" onClick={this.onSubmit}>
								提交
							</Button>
						</Panel>
					</section>
					<aside style={{ width: 200 }}>
						<Panel title="组件">
							<UnitList
								list={this.state.list}
								onClickItem={this.onClickItem}
								focusIndex={this.state.focusIndex}
								dealIndex = {this.dealIndex}
							/>
						</Panel>
					</aside>
				</div>
			</View>
		);
	}
	createComponent(type, data) {
		const a = this.state.list;
		data.name = data.name || type;
		data.type = type;
		if (type === "text") {
			console.log()
			a.push(new RText(data));
			switch (new RText(data).name) {
				case '品名':
					this.setState({
						btnShow: Object.assign(this.state.btnShow, { text1: false })
					});
					break;
				case '原价':
					this.setState({
						btnShow: Object.assign(this.state.btnShow, { text2: false })
					});
					break;	
				case '折扣价':
					this.setState({
						btnShow: Object.assign(this.state.btnShow, { text3: false })
					});
					break;
				default:
					break;
			}
		} else if (type === "image") {
			a.push(new RImage(data));
			this.setState({
				btnShow: Object.assign(this.state.btnShow, { qrCode: false })
			});
		} else if (type === "image2"){
			a.push(new RImage2(data));
			this.setState({
				btnShow: Object.assign(this.state.btnShow, { barCode: false })
			});
		}
		this.setState({ list: a });
	}
	updateList() {
		const list = [...this.state.list];
		this.setState({ list });
	}
	updateFocusIndexByEdt(unit) {
		let i = this.state.list.findIndex(item => item === unit);
		if (i >= 0) {
			this.setState({ focusIndex: i });
		}
	}
	// 组件功能
	dealIndex(item,index){
		switch (item.name) {
			case '二维码':
				this.setState({
					btnShow: Object.assign(this.state.btnShow, { qrCode: true })
				});
				break;
			case '条形码':
				this.setState({
					btnShow: Object.assign(this.state.btnShow, { barCode: true })
				});
				break;
			case '品名':
				this.setState({
					btnShow: Object.assign(this.state.btnShow, { text1: true })
				});
				break;
			case '原价':
				this.setState({
					btnShow: Object.assign(this.state.btnShow, { text2: true })
				});
				break;
			case '折扣价':
				this.setState({
					btnShow: Object.assign(this.state.btnShow, { text3: true })
				});
				break;
			default:
				break;
		}
		const list = [...this.state.list];
		list.splice(index,1);
		this.setState({ list });
	}
	submit() {
		console.log(this.state.list);
		var a = this.state.list.map(item => {
			const {
				type,
				name,
				x,
				y,
				w,
				h,
				r,
				s,
				text,
				fontSize,
				fontFamily,
				color,
				background,
				src
			} = item;
			return {
				type,
				name,
				x,
				y,
				w,
				h,
				r,
				s,
				text,
				fontSize,
				fontFamily,
				color,
				background,
				src
			};
		});
		window.onRootEdtSubmit && window.onRootEdtSubmit(a);
	}
}

export default App;
