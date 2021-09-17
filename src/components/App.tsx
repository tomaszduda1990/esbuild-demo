import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import './App.css';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
const App = () => {
	const [code, setCode] = useState('');
	const [outputCode, setOutputCode] = useState<any>('');
	const initializeEsbuild = async () => {
		await esbuild.initialize({
			wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
		});
	};
	const transformCode = async (code: string) => {
		const transformed = await esbuild.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
			plugins: [unpkgPathPlugin(), fetchPlugin(code)],
		});
		console.log(transformed);
		setOutputCode(transformed.outputFiles[0].text);
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
