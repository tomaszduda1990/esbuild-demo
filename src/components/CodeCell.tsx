import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';
import * as utils from '../utils';
import './CodeCell.css';

const CodeCell = () => {
	const [code, setCode] = useState('');
	const [outputCode, setOutputCode] = useState<any>('');

	useEffect(() => {
		const timer = setTimeout(() => {
			utils.transformCode(code, setOutputCode);
		}, 1000);
		return () => {
			clearTimeout(timer);
		};
	}, [code]);
	const onCodeChange = (value: string) => {
		setCode(value);
	};

	return (
		<Resizable direction='vertical'>
			<div className='code-cell'>
				<Resizable classes='code-cell__item' direction='horizontal'>
					<CodeEditor onCodeChange={onCodeChange} initialValue='const a = 1;' />
				</Resizable>

				<div className='code-output code-cell__item preview-wrapper'>
					<pre style={{ margin: '0' }}>{outputCode && outputCode}</pre>
					<Preview code={outputCode} />
				</div>
			</div>
		</Resizable>
	);
};

export default CodeCell;
