import * as esbuild from 'esbuild-wasm';
import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import './App.css';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
const App = () => {
	const iframeRef = useRef<any>();
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
		setOutputCode(transformed.outputFiles[0].text);
		iframeRef.current.contentWindow.postMessage(
			transformed.outputFiles[0].text,
			'*'
		);
	};
	useEffect(() => {
		initializeEsbuild();
	}, []);

	const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setCode(e.currentTarget.value);
	};
	const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		iframeRef.current.srcdoc = html;
		if (!code) return;

		transformCode(code);
		setCode('');
	};
	const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message', (e) => {
						try{
							eval(e.data)
						}catch(error) {
							const errorMessage = document.createElement('p');
							errorMessage.textContent = error.message;
							errorMessage.style.color = "red";
							document.body.appendChild(errorMessage)
							console.error(error)
							throw error;
						}
					}, false)
				</script>
			</body>
		</html>
	`;
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
					minRows={10}
					style={{ minWidth: '300px' }}
					variant='outlined'
					value={code}
					onChange={onChangeHandler}
				/>
				<Button type='submit' color='primary' variant='outlined'>
					Submit
				</Button>
			</form>

			<div className='code-output'>
				<pre>{!outputCode ? 'No code output...' : outputCode}</pre>
				<iframe
					style={{
						width: outputCode ? '100%' : '0',
						display: outputCode ? 'block' : 'none',
					}}
					ref={iframeRef}
					title='sandbox'
					srcDoc={html}
					sandbox='allow-scripts'
				/>
			</div>
		</Container>
	);
};

export default App;
