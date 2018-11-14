import * as React from "react";
import { Icon, Button, Row, Col } from "antd"
import "./index.css"
export default class UnitList extends React.Component{
	constructor(props){
		super(props);
		this.iconType={
			image: 'picture',
			image2:'picture',
			text:'tag'
		}
	}
	render(){
		const { list = [], onClickItem = e => null, dealIndex = e => null,focusIndex=0}=this.props
		return (
			<ol className="unit-list">
				{list.map((item,i)=>
					<li key={i} title={item.name} onClick={() => onClickItem(item, i)} className={focusIndex===i?'unit-item-atv':''}>
						<Row>
							<Col span={14}>
								<Icon type={this.iconType[item.type]} />
								<span>{item.name}</span></Col>
							<Col span={10}>
								<Button type="primary" size={'small'} onClick={() => dealIndex(item, i)}>删 除</Button></Col>
							
						</Row>
					</li>
				)}
			</ol>
		)
	}
}