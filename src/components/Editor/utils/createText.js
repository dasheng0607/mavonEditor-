export default ({ text = '输入文字', name = '默认名称', fontSize= 16,x=10,y=10,color ='#000'}) => ({
    x,
    y,
    // r: 0,
    // s: 1,
    name,
    text,
    fontSize,
    fontFamily: "微软雅黑",
    color,
    background: "#fff",
    id: 0
});
