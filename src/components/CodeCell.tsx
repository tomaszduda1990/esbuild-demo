import React, { useState, useEffect } from 'react';
import { Container, Button } from '@material-ui/core';
import CodeEditor from './CodeEditor';
import Preview from './Preview'
import * as utils from '../utils'
import './CodeCell.css';

const CodeCell = () => {
	const [code, setCode] = useState('');
	const [outputCode, setOutputCode] = useState<any>('');
	
	useEffect(() => {
		utils.initializeEsbuild();
	}, []);

	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!code) return;

		utils.transformCode(code, setOutputCode);
		setCode('');
	};
	
	return (
		<Container className='CodeCell'>
			<header>
				<h1>Display your code</h1>
			</header>
			<form onSubmit={onSubmitHandler}>
				<CodeEditor onCodeChange={(value: string) => setCode(value)} initialValue="const a = 1;" />
				<Button type='submit' color='primary' variant='outlined'>
					Submit
				</Button>
			</form>
			
			<div className='code-output'>
				<pre>{!outputCode ? 'No code output...' : outputCode}</pre>
				<Preview code={outputCode} />
			</div>
		</Container>
	);
};

export default CodeCell;
