import React from 'react';
import CodeCell from './CodeCell';
import ActionBar from './ActionBar';
import TextEditor from './TextEditor';
import { Cell } from '../state/cell';
interface CellListItemProps {
	cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
	return (
		<div style={{ margin: '100px 0' }}>
			<ActionBar cellId={cell.id} />
			{cell.type === 'code' ? (
				<CodeCell cell={cell} />
			) : (
				<TextEditor cell={cell} />
			)}
		</div>
	);
};

export default CellListItem;
