import React from 'react'
export  default  class Progress extends React.Component{

  static defaultProps = {
    barBg:"rgba(255,255,255,.7)",
  };
  handleProgress=(e)=>{
    // 鼠标点击的位置距离左边距
    const x=e.clientX;
    // dom元素本身的左边距
    const left=this.refs.progressWrap.getBoundingClientRect().left;
    // dom元素的长度
    const progresswrapWidth=this.refs.progressWrap.clientWidth;
    let progress= (x-left)/progresswrapWidth;
    this.props.onProgress&&this.props.onProgress(progress);
  };
  render(){

    const progressInner={
      height:'3px',
      width:`${this.props.percent}%`,
      background:this.props.barBg
    };
    const BarWrap={
      height: "3px",
      background:"rgba(255,255,255,.1)",
      cursor: "pointer",
    };
    return(
        <div style={BarWrap} onClick={(e)=>{this.handleProgress(e)}} ref="progressWrap">
          <div style={progressInner}></div>
        </div>
    )
  }
}
