import React from 'react';
import CellListItem from './CellListItem';
import AddItem from './AddItem';
import { useTypedSelector } from '../hooks/used-type-selector';
const CellList: React.FC = () => {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map((id) => data[id])
	);
	const renderedCells = cells
		.map((cell, iterator) => {
			if (iterator === cells.length - 1)
				return [
					<AddItem key={`addItem${iterator}`} cellId={cell.id} />,
					<CellListItem key={cell.id} cell={cell} />,
					<AddItem key={`lastAddItem`} cellId={null} />,
				];
			return [
				<AddItem key={`addItem${iterator}`} cellId={cell.id} />,
				<CellListItem key={cell.id} cell={cell} />,
			];
		})
		.flat();
	return (
		<div>
			{renderedCells.length ? renderedCells : <AddItem cellId={null} />}
		</div>
	);
};

export default CellList;
