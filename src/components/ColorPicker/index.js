import * as React from "react";
import { ChromePicker } from "react-color";
import "./index.css";
export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            color: props.value||'#fff'
        };
    }
    
    onclick = e => {
        this.setState(prev => ({
            isShow: !prev.isShow
        }));
    };
    onchangeColor = color => {
        let {r,g,b,a}=color.rgb;
        let c=`rgba(${r},${g},${b},${a})`;
        const {onChange=()=>null}=this.props;
        onChange(c)
    };
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.value===prevState.color){
            return null
        }
        return {
            color:nextProps.value
        }
    }
    render() {
        return (
            <div className="form-color-picker">
                <div
                    className="form-color-picker__label"
                    onClick={this.onclick}
                >
                    <div
                        className="form-color-picker__c"
                        style={{ background: this.state.color }}
                    />
                </div>
                <div
                    className="form-color-picker__ct flex flex-t"
                    style={this.state.isShow ? {} : { height: 0 }}
                >
                    <ChromePicker
                        color={this.state.color}
                        onChangeComplete={this.onchangeColor}
                    />
                </div>
            </div>
        );
    }
}
