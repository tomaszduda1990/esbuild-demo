import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import { useResizeComponent } from '../hooks/use-resize-control';
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
	const { initialWidth, width, height, updateInitialWidth } =
		useResizeComponent();
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
