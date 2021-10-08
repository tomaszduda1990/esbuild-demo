import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { transformCode } from '../../utils/index';
import * as actionTypes from '../actions';

interface BundlesState {
	[key: string]: {
		loading: boolean;
		code: string | undefined;
		err: string | undefined;
	};
}

const bundleCodeAsync = createAsyncThunk(
	'bundles/requestStatus',
	async () => {}
);

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
	name: 'bundles',
	initialState,
	reducers: {
		bundleStart: (
			state: BundlesState,
			action: PayloadAction<actionTypes.BundleStartAction>
		): BundlesState => {
			state[action.payload.cellId] = {
				code: '',
				loading: true,
				err: '',
			};
			return state;
		},
		bundleFinish: (
			state: BundlesState,
			action: PayloadAction<actionTypes.BundleCompleteAction>
		): BundlesState => {
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code,
				err: action.payload.bundle.code,
			};
			return state;
		},
	},
});

export const createBundle = (cellId: string, input: string) => {
	console.log('first layer of create bundle');
	return async (dispatch: Dispatch) => {
		console.log('createBundle start initiated');
		dispatch(bundlesSlice.actions.bundleStart({ cellId }));
		try {
			const bundle = await transformCode(input);
			dispatch(
				bundlesSlice.actions.bundleFinish({
					cellId,
					bundle: {
						code: bundle?.code,
						err: bundle?.error,
					},
				})
			);
			console.log('createBundle finished');
		} catch (error) {
			dispatch(
				bundlesSlice.actions.bundleFinish({
					cellId,
					bundle: { code: '', err: 'Unexpected error' },
				})
			);
		}
	};
};
export const { bundleStart, bundleFinish } = bundlesSlice.actions;
export default bundlesSlice;
