import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './TextEditor.css';

const TextEditor: React.FC = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				ref.current &&
				event.target &&
				event.target instanceof HTMLElement &&
				ref.current.contains(event.target)
			) {
				return;
			} else {
				setEditing(false);
			}
		};
		document.body.addEventListener('click', listener, { capture: true });
		return () => {
			document.body.removeEventListener('click', listener, { capture: true });
		};
	}, []);
	const [editorValue, setEditorValue] = useState('## Markdown (click to edit)');
	const [editing, setEditing] = useState(false);
	if (editing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor
					value={editorValue}
					onChange={(value: string = '') => setEditorValue(value)}
				></MDEditor>
			</div>
		);
	}
	return (
		<div
			className='text-editor card'
			id='markdownEditorContainer'
			onClick={() => setEditing(true)}
		>
			<MDEditor.Markdown source={editorValue}></MDEditor.Markdown>
		</div>
	);
};

export default TextEditor;
