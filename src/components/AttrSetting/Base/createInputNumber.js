import * as React from "react";
import {Form,InputNumber} from "antd"
export default (label)=>{
	return ({
		onChange=()=>null,
		name,
		...props
	})=>(
		<Form.Item label={label}>
				<InputNumber disabled={(label === 'width' || label === '高度') ? true : false} {...props} onChange={e=>{
				onChange(name,e)
			}}/>
		</Form.Item>
	)
}