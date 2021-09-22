import React, {useRef, useEffect} from 'react'

interface Props {
        code: string;
}

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

const Preview: React.FC<Props> = ({code}) => {
    const iframeRef = useRef<any>()
    useEffect(() => {
        iframeRef.current.contentWindow.postMessage(
			code,
			'*'
		);
    }, [code])
    return (
        <iframe style={{
						width: code ? '100%' : '0',
						display: code ? 'block' : 'none',
					}}
					ref={iframeRef}
					title='sandbox'
					srcDoc={html}
					sandbox='allow-scripts'>
            
        </iframe>
    )
}

export default Preview
