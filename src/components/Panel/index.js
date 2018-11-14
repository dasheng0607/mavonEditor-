import * as React from "react";
import "./index.css"
export default ({title,children})=>{
	return (
		<section className="m-box">
			<div className="m-box-hd">
				<h2>{title}</h2>
			</div>
			<div className="m-box-bd">{children}</div>
		</section>
	)
}