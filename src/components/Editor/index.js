import * as React from "react";
import { Form, Button, Icon, InputNumber,Select  } from "antd";

import $ from 'jquery'
import createImage from "./utils/createImage";
import createImage1 from "./utils/createImage1";
import createText from "./utils/createText";


import createRender from "../../render";

import "./index.css";

let renderer=null
const Option = Select.Option;

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width || 264,
            height: this.props.height || 176 ,
            list:[]
        };
        this.createRender=createRender.bind(this);

    }
    static getDerivedStateFromProps=(nextProps)=>{
        if(renderer){
            renderer.onPropsUpdate(nextProps)
        }
        return null
    }
    onWidthChange = width => {
        if (width > 0) {
            renderer&&renderer.setSize(width,this.state.height)
            this.setState({ width });
            this.props.onchangdesc('width',width);
        }
    };
    onHeightChange = height => {
        if (height > 0) {
            renderer&&renderer.setSize(this.state.width,height)
            this.setState({ height });
            this.props.onchangdesc('height',height);
        }
    };
    handleChange = value => {
        setTimeout(() =>{
            this.onWidthChange(value.split('*')[0] *1)
            this.onHeightChange(value.split('*')[1] *1)
        })
    };
    onCreateText = (data) => {
        const { onCreateText = () => null, onChange = () => null, onClickItem = () => null } = this.props;
        if (data.text === 'other'){
            onCreateText(Object.assign(createText(data), { select:'text2'}));
        } else {
            onCreateText(createText(data || {}));
        }
        let index = this.props.list.length;
        setTimeout(() => {
            this.props.onUpdate();
            onClickItem({}, index-1)
            onChange('x', this.props.list[index-1].x);
        }, 200);
    };

    onCreateImage = (tar) => {
        const { onCreateImage = () => null, onClickItem = () => null} = this.props;
        onCreateImage(createImage(Object.assign({ name: '二维码'},tar)));
        onClickItem({}, this.props.list.length - 1)
        this.props.onUpdate();
    };
    onCreateImage2 = (tar) => {
        const { onCreateImage2 = () => null, onClickItem = () => null} = this.props;
        onCreateImage2(createImage1(Object.assign({ name: '条形码' },tar)));
        onClickItem({}, this.props.list.length - 1)
        this.props.onUpdate();
    };
     getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }
    componentDidMount(){
        renderer = this.createRender();
        renderer&&renderer.setSize(this.state.width,this.state.height)
        // 查看文件
        let isLook = this.getQueryVariable('templeID');
        if(isLook) {
            $.ajax({
                url: `/price_tag_url/api/pricetag/template/${isLook}`,/*url写异域的请求地址*/
                type: "GET",
                data: {
                    limit: 10,
                    offset: 0,
                },
                beforeSend:  (xhr) =>{
                    xhr.setRequestHeader('grpc-metadata-authorization', this.getCookie("jwt"));//设置消息头  
                },
                success:  (data) =>{
                    console.log(data);
                    if(!data.info) return;
                    this.delLookData(data)
                }
            });
            // let tarData = {"id":"64","name":"测试数据名称","description":"测试数据模板","organizationID":"1","createdAt":"2019-05-21 11:38:22","updatedAt":"2019-05-21 11:38:22","info":{"01":{"x":99,"y":7,"width":48,"colour":1,"description":"测试","size":24,"fontType":"","name":"大名称"},"02":{"x":250,"y":128,"width":32,"colour":2,"description":"黄色","size":16,"fontType":"","name":"标题1"},"03":{"x":103,"y":128,"width":32,"colour":1,"description":"红色","size":16,"fontType":"","name":"标题二"},"04":{"x":-61,"y":127,"width":32,"colour":0,"description":"默认","size":16,"fontType":"","name":"标题三"},"AA":{"x":-9,"y":265,"width":104,"colour":0,"description":"条形码","size":25,"fontType":"","name":"条形码"},"BB":{"x":253,"y":238,"width":52,"colour":0,"description":"二维码","size":52,"fontType":"","name":"二维码"}},"type":["01","AA","02","03","04","BB"],"screenSize":"400*300"}
            // this.delLookData(tarData)
        }
    };
    delLookData(tarData){
        this.props.onchangdesc('name',tarData.name)
        this.props.onchangdesc('description',tarData.description)
        if(tarData.info.BB){
            let BB =tarData.info.BB
            this.onCreateImage({x:264-BB.x,y:BB.y})
        }
        if(tarData.info.AA){
            let AA =tarData.info.AA
            this.onCreateImage2({x:264-AA.x,y:AA.y})
        }
        
        for (const key in tarData.info) {
            if(key != 'AA' && key != 'BB') {
                if(key == '01') {
                    this.onCreateText(createText({ text: tarData.info[key].description, fontSize: tarData.info[key].size, name: tarData.info[key].name,x:264-tarData.info[key].x,y:tarData.info[key].y,color: tarData.info[key].colour == 0 ? '#000' : tarData.info[key].colour == 1 ? 'red' : '#FFD700'} || {}));
                    this.props.onclosebtn('text1',false);
                } else {
                    this.onCreateText({ text: tarData.info[key].description, name: tarData.info[key].name ,x:264-tarData.info[key].x,y:tarData.info[key].y,color: tarData.info[key].colour == 0 ? '#000' : tarData.info[key].colour == 1 ? 'red' : '#FFD700'})
                }
            }
        }
        let tarBox = tarData.screenSize.split('*');   
        setTimeout(() =>{
            this.onWidthChange(tarBox[0] *1)
            this.onHeightChange(tarBox[1] *1)
        })
    }
    render() {
        return (
            <div className="editor">
                <div style={{ position:'relative',textAlign: "center" }}>
                    <canvas
                        ref="cvs"
                        className="editor-cvs"
                        style={{
                            width: this.state.width,
                            height: this.state.height
                        }}
                    />
                </div>
                <Form>
                    <Form.Item label="创建组件">
                        <Button.Group>
                            <Button onClick={() => { this.onCreateText({ text: '品名', fontSize: 24, name: '品名' })}} disabled={this.props.btnShow.text1 ? '' : 'disabled'}>
                                <Icon type="tag" />创建品名
                            </Button>
                            <Button onClick={this.onCreateImage} disabled={this.props.btnShow.qrCode ? '' :'disabled'}>
                                <Icon type="picture" />创建二维码
                            </Button>
                            <Button onClick={this.onCreateImage2} disabled={this.props.btnShow.barCode ? '' : 'disabled'}>
                                <Icon type="picture" />创建条形码
                            </Button>
                            {/* <Button onClick={() => { this.onCreateText({ text: '￥', name: '原价' }) }} disabled={this.props.btnShow.text2 ? '' : 'disabled'}>
                                <Icon type="tag" />原价
                            </Button>
                            <Button onClick={() => { this.onCreateText({ text: '折扣价', name: '折扣价' }) }} disabled={this.props.btnShow.text3 ? '' : 'disabled'}>
                                <Icon type="tag" />折扣价
                            </Button> */}
                            <Button onClick={() => { this.onCreateText({ text: 'other', name: 'other' }) }}>
                                <Icon type="tag" />其它内容
                            </Button>
                        </Button.Group>
                    </Form.Item>
                    <Form.Item label="画布大小">
                        {/* <InputNumber
                            // disabled
                            formatter={v => `宽:${v}`}
                            value={this.state.width}
                            onChange={this.onWidthChange}
                        />
                        <Icon type="paper-clip" style={{ padding: 20 }} />
                        <InputNumber
                            // disabled
                            formatter={v => `高:${v}`}
                            value={this.state.height}
                            onChange={this.onHeightChange}
                        /> */}
                        <Select value={this.state.width+'*'+this.state.height} style={{ width: 120 }} onChange={this.handleChange}>
                            <Option value="212*104">212*104</Option>
                            <Option value="264*176">264*176</Option>
                            <Option value="296*128">296*128</Option>
                            <Option value="400*300"> 400*300</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
