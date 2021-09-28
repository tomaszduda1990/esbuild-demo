import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import {
	deleteCell,
	insertCellBefore,
	updateCell,
	moveCell,
} from './reducers/cells-reducer';

export const store = createStore(reducer, {}, applyMiddleware(thunk));
store.dispatch(
	insertCellBefore({
		id: null,
		type: 'code',
	})
);

store.dispatch(
	insertCellBefore({
		id: null,
		type: 'code',
	})
);

store.dispatch(
	insertCellBefore({
		id: 'c4ff78bd-aa6c-451e-8a3f-fc3c04f0a0df',
		type: 'text',
	})
);

console.log(store.getState());
