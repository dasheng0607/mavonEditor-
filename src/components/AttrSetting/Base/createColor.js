import * as React from "react";
import { Form, Select } from "antd";
import ColorPicker from "../../ColorPicker"
const Option = Select.Option;
export default (label)=>{
	return ({
		value='',
		name,	
		onChange=()=>null,
		...props
	})=>(
		<Form.Item label={label}>
			{/* <ColorPicker 
				value={value}
				onChange={color=>onChange(name,color)}
			/> */}
				<Select defaultValue="#000" style={{ width: 120 }} onChange={color => onChange(name, color)}>
					<Option value="#000">默认</Option>
					<Option value="red">红色</Option>
				</Select>
		</Form.Item>
	)
}