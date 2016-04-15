import ReactDom from 'react-dom';
import React from 'react';
import Picker from './Picker.js';

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
  values:column2
  }];



class App extends React.Component {
	render() {
		return (
			<Picker columns={columns}/>
		);
	}
}

ReactDom.render(<App/>,document.getElementById('app'))