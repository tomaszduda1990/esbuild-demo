import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useDispatch } from 'react-redux';
import './TextEditor.css';
import { Cell } from '../state/cell';
import { updateCell } from '../state';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const dispatch = useDispatch();
	const [editing, setEditing] = useState(false);
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

	if (editing) {
		return (
			<div className='text-editor' ref={ref}>
				<MDEditor
					value={cell.content}
					onChange={(value: string = '') =>
						dispatch(
							updateCell({
								id: cell.id,
								content: value,
							})
						)
					}
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
			<MDEditor.Markdown
				source={
					cell.content.length ? cell.content : 'Please click to edit markdown'
				}
			></MDEditor.Markdown>
		</div>
	);
};

export default TextEditor;
