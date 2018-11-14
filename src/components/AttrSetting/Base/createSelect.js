import * as React from "react";
import {Form,Select} from "antd"
export default (label,list=[])=>{
	return ({
		value='',
		onChange=()=>null,
		name,
		...props
	})=>(
		<Form.Item label={label}>
			<Select defaultValue={value} style={{width:150}} onChange={value=>{
				onChange(name,value)
			}} {...props}>
				{list.map((item,i)=>{
					return <Select.Option key={i} value={item.value} >{item.name}</Select.Option>
				})}
			</Select>
		</Form.Item>
	)
}