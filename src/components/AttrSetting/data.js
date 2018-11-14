import createInputNumber from "./Base/createInputNumber";
import createInputText from "./Base/createInputText";
import createInputSelect from "./Base/createSelect";
import createSelectType from "./Base/createSelectType";
import createColor from "./Base/createColor";

import font from "./font"
import textAlign from "./textAlign"
import textBaseLine from "./textBaseLine"

export default {
	x:createInputNumber('x'),
	y:createInputNumber('y'),
	w:createInputNumber('宽度'),
	h:createInputNumber('高度'),
	r:createInputNumber('选择角度(°)'),
	s:createInputNumber('缩放比例'),
	text:createInputText('文本'),
	fontSize:createInputNumber('字体大小(px)'),
	fontFamily:createInputSelect('字体',font),
	textAlign:createInputSelect('水平对齐',textAlign),
	textBaseLine:createInputSelect('垂直对齐',textBaseLine),
	color:createColor('颜色'),
	background:createColor('背景'),
	name:createInputText('名称'),
	src: createInputText('图片地址（⚠同域名下！！！）'),
	select: createSelectType("type")
}