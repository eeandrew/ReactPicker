import React from 'react';
import './Picker.css';
import Scroller from './Scroller.js';

export default class Picker extends React.Component {

}

Picker.propTypes = {
  columns : React.PropTypes.arrayOf(React.PropTypes.shape({
      align : React.PropTypes.string,
      values : React.PropTypes.array
  }))
}