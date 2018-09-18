import React from 'react';
import './App.css';
import { Editor } from './components/Editor';

class App extends React.PureComponent {
	public render() {
		return (
			<div id="App">
				<Editor />
			</div>
		);
	}
}

export default App;
