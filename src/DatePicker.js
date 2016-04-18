import Picker from './Picker.js';
import moment from 'moment';
import React from 'react';

const DATE_FORMAT = 'YYYY-M-D';
const MONTHS = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.bindFunc();
    this.state = {
      years: this._getYears().years,
      activeYearIndex: this._getYears().activeYearIndex,
      months:MONTHS,
      activeMonthIndex: this._getActiveMonth(),
      days:this._getDays().days,
      activeDayIndex: this._getDays().activeDayIndex,
    }
  }
  componentDidMount() {
    this._getYears();
  }
	render() {
    let columns = [{
      align:'right',
      values : this.state.years,
      activeIndex : this.state.activeYearIndex,
      onItemSelected: this.onYearChanged
    },{
      align:'center',
      values: MONTHS,
      activeIndex:this.state.activeMonthIndex,
      onItemSelected: this.onMonthChanged
    },{
      align:'left',
      values: this.state.days,
      activeIndex: this.state.activeDayIndex,
      onItemSelected: this.state.onDayChanged
    }]
    return <Picker columns={columns} title={this.props.title} shown={this.props.shown} onCancel={this.props.onCancel}/>
	}
  bindFunc() {
    this._getYears = this._getYears.bind(this);
    this._getDays = this._getDays.bind(this);
    this._getActiveMonth = this._getActiveMonth.bind(this);
    this.onMonthChanged = this.onMonthChanged.bind(this);
    this.onYearChanged = this.onYearChanged.bind(this);
    this.onDayChanged = this.onDayChanged.bind(this);
  }
  onYearChanged(index,value) {
    this.setState({
      activeYearIndex:index
    });
  }
  onMonthChanged(index,value) {
    this.setState({
      activeMonthIndex:index
    });
    let days = [];
    let currentDate = this.state.years[this.state.activeYearIndex].match(/\d+/g)[0] + '-' + this.state.months[index].match(/\d+/g)[0];
    let lastDay = moment(currentDate,DATE_FORMAT).endOf('month').date();
    for(let i=1;i<=lastDay;i++) {
      days.push([i,'日'].join(''));
    }
    console.log('lastDay ' + lastDay);
    console.log('activeDayIndex ' + this.state.activeDayIndex);
    let activeDayIndex = lastDay < (this.state.activeDayIndex+1) ? lastDay-1 : this.state.activeDayIndex;
    console.log(activeDayIndex);  
    this.setState({
      days,
      activeDayIndex
    });
  }
  onDayChanged(index,value) {
    this.setState({
      activeDayIndex:index
    })
  }
  _getYears() {
    let minYear = moment(this.props.minDate,DATE_FORMAT).year();
    let maxYear = moment(this.props.maxDate,DATE_FORMAT).year();
    let activeYear = moment(this.props.initialDate,DATE_FORMAT).year();
    let activeYearIndex = activeYear - minYear;
    let years = [];
    for(let y=minYear;y<=maxYear;y++) {
      years.push([y,'年'].join(''));
    }
    return {years,activeYearIndex};
  }
  _getActiveMonth() {
    let activeMonthIndex = moment(this.props.initialDate,DATE_FORMAT).month();
    return activeMonthIndex;
  }
  _getDays() {
    let days = [];
    let lastDay = moment(this.props.initialDate,DATE_FORMAT).endOf('month').date();
    for(let i=1;i<=lastDay;i++) {
      days.push([i,'日'].join(''));
    }
    return {
      days,
      activeDayIndex : moment(this.props.initialDate,DATE_FORMAT).date() -1,
    };
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
  onCancel : React.PropTypes.func,
};

DatePicker.defaultProps = { 
  initialDate: moment().format(DATE_FORMAT),
  maxDate: moment().add(60,'y').format(DATE_FORMAT),
  minDate: moment().subtract(60,'y').format(DATE_FORMAT)
};