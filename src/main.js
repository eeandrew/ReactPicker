import ReactDom from 'react-dom';
import React from 'react';
import Scroller from './Scroller.js';
import PickerBg from './PickerBg.js';

const items = [{label:'item1',key:'1'},
{label:'item2',key:'2'},
{label:'item3',key:'3'},
{label:'item4',key:'4'},
{label:'item5',key:'5'},
{label:'item6',key:'6'},
{label:'item7',key:'7'},
{label:'item8',key:'8'},]

class App extends React.Component {
	render() {
		return (
			<div style={{display:'flex',position:'relative'}}>
				<Scroller items={items}/>
				<Scroller items={items}/>
				<Scroller items={items}/>
				<PickerBg/>
			</div>
		);
	}
}

ReactDom.render(<App/>,document.getElementById('app'))