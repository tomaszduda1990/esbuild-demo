import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import * as utils from '../utils';
import './CodeCell.css';
import { Cell } from '../state/cell';
import { useDispatch } from 'react-redux';
import { deleteCell, insertCellBefore, updateCell, moveCell }from '../state/index'

export interface CodeCellProperties {
	code: string;
	error: string;
}

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const dispatch = useDispatch()
	const [outputCode, setOutputCode] = useState<CodeCellProperties>({
		code: '',
		error: '',
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			utils.transformCode(cell.content, setOutputCode);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [cell.content]);
	const onCodeChange = (value: string) => {
		dispatch(updateCell({
			id: cell.id,
			content: value
		}));
	};
	return (
		<Resizable direction='vertical'>
			<div className='code-cell'>
				<Resizable classes='code-cell__item' direction='horizontal'>
					<CodeEditor onCodeChange={onCodeChange} initialValue={cell.content} />
				</Resizable>

				<div className='code-output code-cell__item preview-wrapper'>
					<pre style={{ margin: '0' }}>
						{outputCode.code && outputCode.code}
					</pre>
					<Preview code={outputCode} />
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
