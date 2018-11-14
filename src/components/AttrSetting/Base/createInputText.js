import * as React from "react";
import {Form,Input} from "antd"
export default (label)=>{
	return ({
		onChange=()=>null,
		name,
		...props
	})=>(
		<Form.Item label={label}>
			<Input disabled={label==='名称'? true :false} {...props} onChange={e=>{
				onChange(name,e.target.value)
			}}/>
		</Form.Item>
	)
}