import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import './App.css';
const App = () => {
	const [code, setCode] = useState('');
	const [outputCode, setOutputCode] = useState<any>('');
	const initializeEsbuild = async () => {
		await esbuild.initialize({
			wasmURL: '/esbuild.wasm',
		});
	};
	const transformCode = async (code: string) => {
		const transformed = await esbuild.transform(code, {
			loader: 'jsx',
			target: 'es2015',
		});
		setOutputCode(transformed.code);
	};
	useEffect(() => {
		initializeEsbuild();
	}, []);

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCode(e.currentTarget.value);
	};
	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!code) return;

		transformCode(code);
		setCode('');
	};
	return (
		<Container className='App'>
			<header>
				<h1>Display your code</h1>
			</header>
			<form onSubmit={onSubmitHandler}>
				<TextField
					id='outlined-multiline-static'
					label='Multiline'
					multiline
					rows={4}
					variant='outlined'
					value={code}
					onChange={onChangeHandler}
				/>
				<Button type='submit' color='primary' variant='outlined'>
					Submit
				</Button>
			</form>
			<div className='code-output'>
				<pre>{outputCode ? outputCode : 'No code output...'}</pre>
			</div>
		</Container>
	);
};

export default App;
