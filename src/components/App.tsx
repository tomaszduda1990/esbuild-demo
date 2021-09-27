import React from 'react';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import { initializeEsbuild } from '../utils';

const App = () => {
	initializeEsbuild();
	return (
		<div>
			<TextEditor></TextEditor>
		</div>
	);
};

export default App;
