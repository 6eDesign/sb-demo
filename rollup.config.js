import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from "rollup-plugin-uglify";
import buble from 'rollup-plugin-buble';
import browsersync from 'rollup-plugin-browsersync'


let isProd = process.env.buildTarget == 'prod';

let plugins = [
	resolve(),
	commonjs(), 
	buble()
]; 

if(isProd) { 
	plugins.push(uglify());
}

if(!isProd) { 
	plugins.push(browsersync({
		proxy: 'localhost:3005',
		files: ['views/*.pug']
	}));
}

export default [
	// browser-friendly demo builds
	{
		input: 'src/todo.js',
		output: { 
			name: 'todo',
			file: 'dist/todo.js',
			format: 'umd',
			sourcemap: true
		},
		plugins: plugins
	}
];