import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import { initializeEsbuild } from '../utils';

const App = () => {
	initializeEsbuild();
	return (
		<Provider store={store}>
			<TextEditor></TextEditor>
		</Provider>
	);
};

export default App;
