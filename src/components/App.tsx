import React from 'react';
import CodeCell from './CodeCell';
import { initializeEsbuild } from '../utils';

const App = () => {
	initializeEsbuild();
	return (
		<div>
			<CodeCell />
		</div>
	);
};

export default App;
