import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './Resizable.css';
interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	classes?: string;
}

const Resizable: React.FC<ResizableProps> = ({
	direction,
	children,
	classes,
}) => {
	const [width, updateWidth] = useState(window.innerWidth);
	const [height, updateHeight] = useState(window.innerHeight);
	const [initialWidth, updateInitialWidth] = useState(window.innerWidth);
	useEffect(() => {
		let timer: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				updateWidth(window.innerWidth);
				updateHeight(window.innerHeight);
				if (window.innerWidth * 0.8 < initialWidth) {
					updateInitialWidth(window.innerWidth * 0.8);
				}
			}, 100);
		};
		window.addEventListener('resize', listener);
		return () => {
			window.removeEventListener('resize', listener);
		};
	}, [initialWidth]);
	let resizableProps: ResizableBoxProps;
	if (direction === 'horizontal') {
		resizableProps = {
			width: initialWidth * 0.75,
			height: Infinity,
			resizeHandles: ['e'],
			maxConstraints: [width * 0.8, Infinity],
			onResizeStop: (event, data) => {
				updateInitialWidth(data.size.width);
			},
		};
	} else {
		resizableProps = {
			width: Infinity,
			height: 300,
			resizeHandles: ['s'],
			maxConstraints: [Infinity, height * 0.9],
		};
	}

	return (
		<ResizableBox className={classes} {...resizableProps}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
