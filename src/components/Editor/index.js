import * as React from "react";
import { Form, Button, Icon, InputNumber } from "antd";

import createImage from "./utils/createImage";
import createImage1 from "./utils/createImage1";
import createText from "./utils/createText";


import createRender from "../../render";

import "./index.css";

let renderer=null

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 400,
            height: 300,
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
        }
    };
    onHeightChange = height => {
        if (height > 0) {
            renderer&&renderer.setSize(this.state.width,height)
            this.setState({ height });
        }
    };
    onCreateText = (data) => {
        const { onCreateText = () => null, onChange = () => null, onClickItem = () => null } = this.props;
        if (data.text === 'other'){
            onCreateText(Object.assign(createText(data), { select:'text2'}));
        } else {
            onCreateText(createText(data || {}));
        }
        setTimeout(() => {
            this.props.onUpdate();
            onClickItem({}, this.props.list.length-1)
            onChange('x', 10);
        }, 100);
    };

    onCreateImage = () => {
        const { onCreateImage = () => null, onClickItem = () => null} = this.props;
        onCreateImage(createImage({ name: '二维码'}));
        onClickItem({}, this.props.list.length - 1)
        this.props.onUpdate();
    };
    onCreateImage2 = () => {
        const { onCreateImage2 = () => null, onClickItem = () => null} = this.props;
        onCreateImage2(createImage1({ name: '条形码' }));
        onClickItem({}, this.props.list.length - 1)
        this.props.onUpdate();
    };
    componentDidMount(){
        renderer = this.createRender();
        renderer&&renderer.setSize(this.state.width,this.state.height)
    };
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
                            <Button onClick={() => { this.onCreateText({ text: '品名', fontSize: 30, name: '品名' })}} disabled={this.props.btnShow.text1 ? '' : 'disabled'}>
                                <Icon type="tag" />创建品名
                            </Button>
                            <Button onClick={this.onCreateImage} disabled={this.props.btnShow.qrCode ? '' :'disabled'}>
                                <Icon type="picture" />创建二维码
                            </Button>
                            <Button onClick={this.onCreateImage2} disabled={this.props.btnShow.barCode ? '' : 'disabled'}>
                                <Icon type="picture" />创建条形码
                            </Button>
                            <Button onClick={() => { this.onCreateText({ text: '￥', name: '原价' }) }} disabled={this.props.btnShow.text2 ? '' : 'disabled'}>
                                <Icon type="tag" />原价
                            </Button>
                            <Button onClick={() => { this.onCreateText({ text: '折扣价', name: '折扣价' }) }} disabled={this.props.btnShow.text3 ? '' : 'disabled'}>
                                <Icon type="tag" />折扣价
                            </Button>
                            <Button onClick={() => { this.onCreateText({ text: 'other', name: 'other' }) }}>
                                <Icon type="tag" />其它内容
                            </Button>
                        </Button.Group>
                    </Form.Item>
                    <Form.Item label="画布大小">
                        <InputNumber
                            formatter={v => `宽:${v}`}
                            value={this.state.width}
                            onChange={this.onWidthChange}
                        />
                        <Icon type="paper-clip" style={{ padding: 20 }} />
                        <InputNumber
                            formatter={v => `高:${v}`}
                            value={this.state.height}
                            onChange={this.onHeightChange}
                        />
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
