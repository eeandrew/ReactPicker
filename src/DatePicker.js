import Picker from './Picker.js';
import moment from 'moment';
import React from 'react';

const DATE_FORMAT = 'YYYY-MM-DD';
const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
const DAYS = ['1日','2日','3日']
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.bindFunc();
    this.state = {
      years: [],
      months:MONTHS,
      days:DAYS,
    }
  }
  componentDidMount() {
    this._getYears();
  }
	render() {
    let columns = [{
      align:'right',
      values : this.state.years,
    },{
      align:'center',
      values: MONTHS,
    },{
      align:'left',
      values: this.state.days,
    }]
    return <Picker columns={columns} title={this.props.title} shown={this.props.shown}/>
	}
  bindFunc() {
    this._getYears = this._getYears.bind(this);
    this._getDays = this._getDays.bind(this);
  }
  _getYears() {
    let minYear = moment(this.props.minDate).year();
    let maxYear = moment(this.props.maxDate).year();
    let years = [];
    for(let y=minYear;y<=maxYear;y++) {
      years.push([y,'年'].join(''));
    }
    this.setState({
      years : years
    });
  }
  _getDays() {

  }
  
}

/**
 *  initialDate: 2015-9-1 2015-09-01
 *  maxDate: 2122-01-01
 *  minDate: 1949-01-01
 */
DatePicker.propTypes = {
  initialDate: React.PropTypes.string,
  maxDate: React.PropTypes.string,
  minDate: React.PropTypes.string,
  title: React.PropTypes.string,
  shown: React.PropTypes.bool,
};

DatePicker.defaultProps = { 
  maxDate: moment().add(60,'y').format(DATE_FORMAT),
  minDate: moment().subtract(60,'y').format(DATE_FORMAT)
};