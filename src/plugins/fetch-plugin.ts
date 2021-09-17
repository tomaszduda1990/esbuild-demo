import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});
export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: inputCode,
					};
				}
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				console.log('cachedResult: ', cachedResult);
				if (cachedResult) {
					console.log('Should give items from storage: ', cachedResult);
					return cachedResult;
				}
				const { data, request } = await axios.get(args.path);
				const config: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				await fileCache.setItem(args.path, config);
				return config;
			});
		},
	};
};
