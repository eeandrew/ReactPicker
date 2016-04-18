import React from 'react';
import ReactDOM from 'react-dom';
import './SlideUp.css';
import classNames from 'classnames';

export default class SlideUp extends React.Component {
  render() {
    return (
      <div className={classNames('slide-up',{show:this.props.isShown})}>
        <div className="slide-header">
            <div className="header-cacel-btn">取消</div>
            <div className="header-confirm-btn">确定</div>
            <div className="header-title">{this.props.title}</div>
        </div>
        <div className="slide-content">{this.props.children}</div>
      </div> 
    );
  }
}

SlideUp.propTypes = {
  title : React.PropTypes.array,
  isShown : React.PropTypes.bool,
};

SlideUp.defaultProps = {
  isShown : false
};