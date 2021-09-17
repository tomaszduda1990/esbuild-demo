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
			build.onLoad({ filter: /^index\.js$/ }, () => {
				return {
					loader: 'jsx',
					contents: inputCode,
				};
			});
			build.onLoad({ filter: /.*/ }, async (args) => {
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				if (cachedResult) {
					console.log('Should give items from storage: ', cachedResult);
					return cachedResult;
				}
			});
			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);
				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");
				const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;
				const config: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
				await fileCache.setItem(args.path, config);
				return config;
			});
			build.onLoad({ filter: /.*/ }, async (args: any) => {
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
