import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
let hasInitialized: boolean = false;
export const initializeEsbuild = async () => {
	if (!hasInitialized) {
		hasInitialized = true;
		await esbuild.initialize({
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.0/esbuild.wasm',
		});
	}
};
export const transformCode = async (
	code: string,
	cb: (arg: string) => void
) => {
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
	cb(transformed.outputFiles[0].text);
};
