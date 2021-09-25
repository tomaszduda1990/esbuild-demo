import React, { useRef, useEffect } from 'react';
import './Preview.css';
import { CodeCellProperties } from './CodeCell';

interface Props {
	code: CodeCellProperties;
}

const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const errorMessage = document.createElement('p');
							errorMessage.classList.add('error-message')
							errorMessage.textContent = err.message;
							errorMessage.style.color = "red";
							document.body.appendChild(errorMessage)
							throw err;
					}
					window.addEventListener('error', (e) => {
						handleError(e.error)
					})
					window.addEventListener('message', (e) => {
						try{
							const errorMessage = document.querySelectorAll('.error-message')
							if(errorMessage) {
								errorMessage.forEach((err) => {
									document.body.removeChild(err);
								})
							}
							if(e.data.error) throw new Error(e.data.error)
							eval(e.data.code)
						}catch(error) {
							handleError(error)
						}
					}, false)
				</script>
			</body>
		</html>
	`;

const Preview: React.FC<Props> = ({ code }) => {
	const iframeRef = useRef<any>();
	useEffect(() => {
		iframeRef.current.contentWindow.postMessage(code, '*');
	}, [code]);
	return (
		<div className='preview-wrapper'>
			<iframe
				style={{
					backgroundColor: '#fff',
					width: code ? '100%' : '0',
					display: code ? 'block' : 'none',
				}}
				ref={iframeRef}
				title='sandbox'
				srcDoc={html}
				sandbox='allow-scripts'
			></iframe>
		</div>
	);
};

export default Preview;
