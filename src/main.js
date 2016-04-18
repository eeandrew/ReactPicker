import ReactDom from 'react-dom';
import React from 'react';
import Picker from './Picker.js';
import DatePicker from './DatePicker.js';

const column1 = ['item1','item2','item3'];
const column2 = ['item4','item5','item6'];

const onFirstColumnItemSelected = function(index,value) {
  console.log(index + ' ' + value);
}

const columns = [{
  values:column1,
  activeIndex:1,
  onItemSelected:onFirstColumnItemSelected
  },{
  values:column2,
  activeIndex:2,
  onItemSelected:onFirstColumnItemSelected
  }];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shown : false
    };
  }
  togglePicker() {
    this.setState({
      shown : !this.state.shown
    })
  }
  onCancel() {
    this.setState({
      shown:false
    })
  }
  onConfirm() {
    this.setState({
      shown:false
    })
  } 
	render() {
		return (
      <div>
       <DatePicker shown={this.state.shown}/>  
       <button onClick={this.togglePicker.bind(this)}> Toggle </button>
      </div>
		);
	}
}

ReactDom.render(<App/>,document.getElementById('app'))