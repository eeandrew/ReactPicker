import React from 'react';
import ReactDom from 'react-dom';
import './PickerBg.css';

export default class PickerBg extends React.Component {
	render() {
		return (
      <ul className="picker-bg" style={{height:this.props.height,backgroundColor:this.props.background}}>
          <li className="picker-bg-item"/>
          <li className="picker-bg-item"/>
          <li className="picker-bg-item"/>
      </ul>
    );
	}
}

PickerBg.propTypes = {
  height:React.PropTypes.string,
  background:React.PropTypes.string
};

PickerBg.defaultProps = {
  background:'#fff',
  height:'200px',
};