import * as React from "react";
import {Form,InputNumber} from "antd"
export default (label)=>{
	return ({
		onChange=()=>null,
		name,
		...props
	})=>(
		<Form.Item label={label}>
			<InputNumber {...props} onChange={e=>{
				onChange(name,e)
			}}/>
		</Form.Item>
	)
}