import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//handle root entry file
			build.onResolve({ filter: /^index\.js$/ }, () => {
				return { path: 'index.js', namespace: 'a' };
			});

			//handle nested packages
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				const path = new URL(
					args.path,
					`https://unpkg.com` + args.resolveDir + '/'
				).href;
				return { path, namespace: 'a' };
			});

			//handle main file of a module
			build.onResolve({ filter: /.*/ }, (args: any) => {
				return { path: `https://unpkg.com/${args.path}`, namespace: 'a' };
			});
		},
	};
};
