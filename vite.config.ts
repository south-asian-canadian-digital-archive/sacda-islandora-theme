import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [tailwindcss()],

	build: {
		outDir: 'dist',
		emptyOutDir: true,
		manifest: false,
		minify: process.env.NODE_ENV === 'production',
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'css/main.css'),
				// app: resolve(__dirname, 'js/app.js'),
			},
			output: {
				// Keep consistent filenames (no hashes) for Drupal
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: '[name][extname]',
			},
		},
	},
	css: {
		devSourcemap: true,
	},
});
