import React from 'react';
import ReactDOM from 'react-dom';
import IScroll from './lib/iscroll-probe-min.js';
import './Scroller.css';

const ROWS_PER_PAGE = 3;

export default class Scroller extends React.Component {
  constructor(props){
    super(props);
    this.bindFunc();
    this.state = {
      snapHeight : 0,
      activeIndex : 0
    }
  }
  componentWillMount() {
    this.setState({
      activeIndex : this.props.activeIndex
    });
  }
  componentDidMount() {
    let pickerDOM = ReactDOM.findDOMNode(this);
    let rowHeight = pickerDOM.offsetHeight / ROWS_PER_PAGE;
    let scrollOption = {
      scrollX: false,
      scrollY: true,
      momentum: true,
      snap: 'li',
      keyBindings: true,
    };
    this.setState({
      snapHeight:rowHeight
    });
    this.IScroll = new IScroll(pickerDOM,scrollOption);
    this.IScroll.on('scrollEnd',this._onScrollEnd.bind(this));
    this.resetScroller();
  }
  omponentWillUnmount() {
    if(this.IScroll) {
        this.IScroll.destroy();
        this.IScroll = null;
    }
  }
  resetScroller() {
    setTimeout(()=>{
      this.IScroll.refresh();
      this.IScroll.scrollTo(0,this.state.snapHeight*this.props.activeIndex*-1,300);
    },1)
  }
  _onScrollEnd() {
    let activeIndex = Math.round(Math.abs(this.IScroll.y) / this.state.snapHeight);
    this.setState({
      activeIndex:activeIndex
    });
    if(typeof this.props.onItemSelected === 'function') {
      this.props.onItemSelected.call(null,activeIndex,this.props.items[activeIndex]);
    }
  }
	render() {
		return(
      <div className="scroller-wrapper">
          <ul className="scroller">
            {this._getChildren()}
          </ul>
      </div> 
    );
	}
  _getPlaceHolder(key) {
    return (<li className="item" style={{height:this.state.snapHeight}} key={key}></li>);
  }
  _getChildren() {
    let children = this.props.items.map((item,index)=>{
      let className = "item " + (index === this.state.activeIndex ? 'active' : '');
      return (<li className={className} style={{height:this.state.snapHeight,justifyContent:this._getAlignment()}} key={index}>{item}</li>);
    });
    return [this._getPlaceHolder(-1),...children,this._getPlaceHolder(-2)];
  }
  _getAlignment() {
      let align = this.props.align.toUpperCase();
      switch(align) {
        case 'CENTER':
        return 'center';
        case 'LEFT' :
        return 'flex-start';
        case 'RIGHT' :
        return 'flex-end';
      }
  } 
  bindFunc() {
    this._getChildren.bind(this);
    this._getPlaceHolder.bind(this);
    this._onScrollEnd.bind(this);
    this._getAlignment.bind(this);
    this.resetScroller.bind(this);
  }
}

Scroller.propTypes = {
  items : React.PropTypes.array,
  activeIndex: React.PropTypes.number,
  align: React.PropTypes.string, //center left right
  onItemSelected : React.PropTypes.func,                                 
};

Scroller.defaultProps = {
  activeIndex:0,
  align:'center',
};