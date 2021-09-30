import React from 'react'
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';
import { useDispatch } from 'react-redux';
import { Cell } from '../state/cell';
interface CellListItemProps {
    cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
    const dispatch = useDispatch();
    // dispatch(updateCell({
    //     id:
    // }))
    return (
        <div>
            { cell.type  === 'code' ? <CodeCell cell={cell} /> : <TextEditor cell={cell} /> }
        </div>
    )
}

export default CellListItem
