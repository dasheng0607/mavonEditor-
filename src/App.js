import React, { Component } from "react";
import $ from 'jquery'
import { Button, Input,Form, Row, Col, Icon  } from "antd";
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
			},
			description:'模板描述',
			name:'模板名称',
			width: 264,
      height: 176,
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
	onchangdesc = (name, value) => {
		this.setState({ [name]:value });
	}
	closebtn = (name, value) => {
		this.setState({
			btnShow: Object.assign(this.state.btnShow, { [name]: false })
		});
	}
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
								width={this.state.width}
								height={this.state.height} 
								index={this.state.focusIndex}
								onCreateText={this.onCreateText}
								onCreateImage={this.onCreateImage}
								onCreateImage2={this.onCreateImage2}
								onChange={this.onChangeTarget}
								onUpdate={this.onUpdateEdt}
								onFocus={this.onEdtHasFocus}
								btnShow={this.state.btnShow}
								onClickItem={this.onClickItem}
								onchangdesc = {this.onchangdesc}
								onclosebtn={this.closebtn}
							/>
							<Form layout="inline">
								<Form.Item label='模板名称'>
									<Input placeholder="请输入模板名称" defaultValue ={this.state.name} onChange={(e) =>{
										this.state.name = e.target.value;
									}}/>
								</Form.Item>
								<Form.Item label='模板描述'>
									<Input placeholder="请输入模板描述" defaultValue={this.state.description}  onChange={(e) => {
										this.state.description = e.target.value;
									}}/>
								</Form.Item>
							</Form>
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
	getCookie(name) {
			var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

			if (arr = document.cookie.match(reg))

				return unescape(arr[2]);
			else
				return null;
		}
	getQueryVariable(variable)
	{
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i=0;i<vars.length;i++) {
							var pair = vars[i].split("=");
							if(pair[0] == variable){return pair[1];}
			}
			return(false);
	}
	submit() {
		if(this.getQueryVariable('templeID')){
			alert("查看模式不能修改模板");
			return;
		}
		console.log(this.state.list);
		if (!this.state.description || !this.state.name){
			alert("请输入模块名称以及描述");
			return;
		}
		if (!this.state.list.length){
			alert("模板内容不能为空");
			return;
		}
		if (this.state.list.length > 10) {
			alert("模板内容不能多于10个");
			return;
		}
		let sendData = {
			"screenSize": `${this.state.width}*${this.state.height}`,
			"description": this.state.description,
			"name": this.state.name,
			"organizationID": "", //要在接口拿
			"info":{
			},
			"type":[]
		}
		let num =1;
		let tarB;
		let isFont = false;
		let isY = false;
		this.state.list.forEach((ele) =>{
			if (ele.y % 8 != 0){
				isY = true;
			}
			if (ele.type === 'text') {
				if ([12, 16, 24].indexOf(ele.fontSize) <0) {
					isFont = true;
				}
				let tar = num === 10 ?  num : '0' + num;
				num++;
				sendData.info[tar] = {
					"y": ele.y,
					"colour": ele.color === "#000" ? 0 : ele.color === "red" ? 1 : 2,
					"description": ele.description || ele.text,
					"name": ele.name,
					"fontTyep": "M",
					"size": ele.fontSize,
					"width": Math.ceil(ele.w),
					"x": 264 - ele.x 
				}
			} else if (ele.type === 'image2') {
				sendData.info.AA = {
					"y": ele.y,
					"colour": 0,
					"description": ele.name,
					"name": ele.name,
					"fontTyep": "M",
					"size": ele.h,
					"width": ele.w,
					"x": 264 - ele.x
				}
			} else if (ele.type === 'image') {
				tarB ={
					"y": ele.y,
					"colour": 0,
					"description": ele.name,
					"name": ele.name,
					"fontTyep": "M",
					"size": ele.h,
					"width": ele.w,
					"x": 264 - ele.x
				}
			}
		})
		if (tarB){
			sendData.info.BB = tarB;
		}
		for (const key in sendData.info) {
			sendData.type.push(key)
		}
		// if (isY){
		// 	alert("Y坐标必须为8的倍数，请确认");
		// 	return;
		// }
		if (isFont){
			alert("字体大小只有12,16,24三个规格请确认");
			return;
		}
		console.log('sendData',sendData)
		$.ajax({
			url: "/price_tag_url/api/organizations",/*url写异域的请求地址*/
			type: "GET",
			data: {
				limit: 10,
				offset: 0,
			},
			beforeSend:  (xhr) =>{
				xhr.setRequestHeader('grpc-metadata-authorization', this.getCookie("jwt"));//设置消息头  
			},
			success:  (data) =>{
				//保存获取到的id，调用方法，根据id获取应用 organizationID
				if(!data.result) return;
				let id = data.result[0].id;
				sendData.organizationID =id;
				$.ajax({
					url: "/price_tag_url/api/pricetag/template",/*url写异域的请求地址*/
					type: "post",
					data: JSON.stringify(sendData),
					beforeSend: (xhr) => {
						xhr.setRequestHeader('grpc-metadata-authorization', this.getCookie("jwt"));//设置消息头  
					},
					success: (data) => {
						alert('添加成功');
						window.location.reload()
					}
				});
			}
		});
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
