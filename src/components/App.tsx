import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import CellList from './CellList';
import { initializeEsbuild } from '../utils';

const App: React.FC = () => {
	initializeEsbuild();
	return (
		<Provider store={store}>
			<CellList />
		</Provider>
	);
};

export default App;
