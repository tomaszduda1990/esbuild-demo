import { combineReducers } from 'redux';
import cellsReducer from './cells-reducer';
import bundlesSlice from './bundles';

const reducer = combineReducers({
	cells: cellsReducer.reducer,
	bundles: bundlesSlice.reducer,
});

export default reducer;
export type RootState = ReturnType<typeof reducer>;
