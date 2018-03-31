import * as React from 'react';
import './App.css';
import { Editor } from './components/Editor';

class App extends React.Component {
	render() {
		return (
			<div id="App">
				<Editor/>
			</div>
		);
	}
}

export default App;
