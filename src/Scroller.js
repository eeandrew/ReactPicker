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
    setTimeout(()=>{
      this.IScroll.refresh()
    },1)
  }
  omponentWillUnmount() {
    if(this.IScroll) {
        this.IScroll.destroy();
        this.IScroll = null;
    }
  }
  _onScrollEnd() {
    let activeIndex = Math.round(Math.abs(this.IScroll.y) / this.state.snapHeight);
    this.setState({
      activeIndex:activeIndex
    });
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
      return (<li className={className} style={{height:this.state.snapHeight}} key={item.key}>{item.label}</li>);
    });
    return [this._getPlaceHolder(-1),...children,this._getPlaceHolder(-2)];
  }
  bindFunc() {
    this._getChildren.bind(this);
    this._getPlaceHolder.bind(this);
    this._onScrollEnd.bind(this);
  }
}

Scroller.propTypes = {
  items : React.PropTypes.arrayOf(React.PropTypes.shape({
    label:React.PropTypes.string,
    key: React.PropTypes.string,
  })),
  activeIndex: React.PropTypes.number
};

Scroller.defaultProps = {
  activeIndex:0
};