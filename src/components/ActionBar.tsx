import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCell, moveCell } from '../state/reducers/cells-reducer';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, ButtonGroup } from '@material-ui/core';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
	cellId: string;
}

const ActionBar: React.FC<Props> = ({ cellId }) => {
	const dispatch = useDispatch();
	return (
		<div
			style={{
				zIndex: 1000,
				display: 'flex',
				minWidth: '100%',
				justifyContent: 'flex-end',
				width: '100%',
				background: '#eaeaea',
			}}
			className='action-bar'
		>
			<ButtonGroup
				variant='contained'
				aria-label='outlined primary button group'
			>
				<Button
					onClick={() => dispatch(moveCell({ id: cellId, direction: 'down' }))}
					variant='contained'
					color='primary'
				>
					<ArrowDropDownIcon />
				</Button>
				<Button
					onClick={() => dispatch(moveCell({ id: cellId, direction: 'up' }))}
					variant='contained'
					color='primary'
				>
					<ArrowDropUpIcon />
				</Button>
				<Button
					onClick={() => dispatch(deleteCell({ id: cellId }))}
					variant='outlined'
					color='secondary'
				>
					<DeleteForeverIcon />
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default ActionBar;
