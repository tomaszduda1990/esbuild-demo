import React from 'react'
import CellListItem from './CellListItem'
import { useTypedSelector } from '../hooks/used-type-selector'
const CellList: React.FC = () => {
    const cells = useTypedSelector(({ cells: { order, data }}) =>  order.map(id => data[id]))

    const renderedCells = cells.map(cell => {
        return <CellListItem key={cell.id} cell={cell} />
    })
    return (
        <div>
            {renderedCells}
        </div>
    )
}

export default CellList
