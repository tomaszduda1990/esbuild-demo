import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { insertCellBefore } from '../state/reducers/cells-reducer';
import { useDispatch } from 'react-redux';
import './AddItem.css';
interface Props {
	cellId: string | null;
}

const AddItem: React.FC<Props> = ({ cellId }) => {
	const dispatch = useDispatch();
	return (
		<div className='add-item'>
			<ButtonGroup>
				<Button
					onClick={() =>
						dispatch(insertCellBefore({ id: cellId, type: 'code' }))
					}
					variant='contained'
					color='primary'
				>
					<AddCircleOutlineIcon /> Code
				</Button>
				<Button
					onClick={() =>
						dispatch(insertCellBefore({ id: cellId, type: 'text' }))
					}
					variant='contained'
					color='primary'
				>
					<AddCircleOutlineIcon /> Markdown
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default AddItem;
