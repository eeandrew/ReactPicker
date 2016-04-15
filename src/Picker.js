import React from 'react';
import './Picker.css';
import Scroller from './Scroller.js';
import PickerBg from './PickerBg.js';

export default class Picker extends React.Component {
  constructor(props) {
    super(props);
    this._bindFunc();
  }
  render() {
    return (
      <div style={{display:'flex',position:'relative'}}>
       {this._renderScrollers()}
        <PickerBg/>
      </div>
    );
  }
  _renderScrollers() {
    return this.props.columns.map((column,index)=>{
      return (<Scroller items={column.values} key={index} align={column.align} activeIndex={column.activeIndex} onItemSelected={column.onItemSelected}/>);
    });
  }
  _bindFunc() {
    this._renderScrollers.bind(this);
  }
}

Picker.propTypes = {
  columns : React.PropTypes.arrayOf(React.PropTypes.shape({
      align : React.PropTypes.string,
      values : React.PropTypes.array,
      activeIndex : React.PropTypes.number,
      onItemSelected : React.PropTypes.func,
  })),
}