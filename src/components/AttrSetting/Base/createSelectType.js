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
				<Select defaultValue="text2" style={{ width: 120 }} onChange={color => onChange(name, color)}>
					<Option value="text2">text2</Option>
					<Option value="text3">text3</Option>
					<Option value="text4">text4</Option>
					<Option value="text5">text5</Option>
				</Select>
		</Form.Item>
	)
}