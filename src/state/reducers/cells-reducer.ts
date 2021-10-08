import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import * as actionTypes from '../actions';
import { Cell } from '../cell';

interface CellsState {
	data: {
		[key: string]: Cell;
	};
	loading: boolean;
	order: string[];
	error: string | null;
}

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const cellsSlice = createSlice({
	name: 'cells',
	initialState,
	reducers: {
		moveCell: (
			state: CellsState,
			{ payload }: PayloadAction<actionTypes.MoveCellAction>
		) => {
			const { direction, id } = payload;
			const moveItemIndex = state.order.findIndex((item) => item === id);

			// check if element is on 0 or last index then return
			if (
				(moveItemIndex === 0 && direction === 'up') ||
				(moveItemIndex === state.order.length - 1 && direction === 'down')
			) {
				return state;
			} else {
				// setup new index and manipulate state
				const newIndex =
					direction === 'up' ? moveItemIndex - 1 : moveItemIndex + 1;
				state.order[moveItemIndex] = state.order[newIndex];
				state.order[newIndex] = id;
			}
		},
		deleteCell: (
			state: CellsState,
			action: PayloadAction<actionTypes.DeleteCellAction>
		) => {
			const { id } = action.payload;
			state.order = state.order.filter((item) => item !== id);
			delete state.data[id];
		},
		insertCellBefore: (
			state: CellsState,
			action: PayloadAction<actionTypes.InsertBeforeCellActon>
		) => {
			const cellId = uuidv4();
			const cell: Cell = {
				id: cellId,
				content: '',
				type: action.payload.type,
			};
			if (!action.payload.id) {
				state.order.push(cellId);
			} else {
				const indexOfItem = state.order.findIndex(
					(item) => item === action.payload.id
				);
				state.order.splice(indexOfItem, 0, cellId);
			}
			state.data[cellId] = cell;
		},
		updateCell: (
			state: CellsState,
			action: PayloadAction<actionTypes.UpdateCellAction>
		) => {
			const { id, content } = action.payload;
			state.data[id].content = content;
		},
	},
});

export const { deleteCell, insertCellBefore, updateCell, moveCell } =
	cellsSlice.actions;
export default cellsSlice;
