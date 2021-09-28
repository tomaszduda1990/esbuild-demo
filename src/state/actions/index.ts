import { CellTypes } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCellAction {
	id: string;
	direction: Direction;
}

export interface DeleteCellAction {
	id: string;
}

export interface InsertBeforeCellActon {
	id: string | null;
	type: CellTypes;
}

export interface UpdateCellAction {
	id: string;
	content: string;
}
