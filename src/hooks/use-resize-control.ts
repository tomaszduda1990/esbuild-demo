import { useEffect, useState } from 'react';
interface UseResizeOutput {
	height: number;
	width: number;
	initialWidth: number;
	updateInitialWidth: (width: number) => void;
}
export const useResizeComponent: () => UseResizeOutput = () => {
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
	return {
		width,
		height,
		initialWidth,
		updateInitialWidth,
	};
};
