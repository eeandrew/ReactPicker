import React from 'react';
import ReactDOM from 'react-dom';
import './SlideUp.css';
import classNames from 'classnames';

export default class SlideUp extends React.Component {
  render() {
    return (
      <div className={classNames('slide-up',{show:this.props.isShown})}>
        <div className="slide-header">
            <div className="header-cacel-btn" onClick={this.props.onCancel}>取消</div>
            <div className="header-confirm-btn" onClick={this.props.onConfirm}>确定</div>
            <div className="header-title">{this.props.title}</div>
        </div>
        <div className="slide-content">{this.props.children}</div>
      </div> 
    );
  }
}

SlideUp.propTypes = {
  title : React.PropTypes.string,
  isShown : React.PropTypes.bool,
  onCancel : React.PropTypes.func,
  onConfirm : React.PropTypes.func
};

SlideUp.defaultProps = {
  isShown : false
};