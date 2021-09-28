import { combineReducers } from 'redux';
import cellsReducer from './cells-reducer';

const reducer = combineReducers({
	cells: cellsReducer.reducer,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
