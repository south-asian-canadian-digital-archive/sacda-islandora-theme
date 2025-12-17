import { build } from 'vite';
import { readdirSync, statSync, existsSync } from 'fs';
import { resolve, join } from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcDir = resolve(__dirname, 'src');
const ignoreDirs = ['lib', 'layout', 'app.css'];

async function buildComponents() {
	const items = readdirSync(srcDir);

	for (const item of items) {
		if (ignoreDirs.includes(item)) continue;

		const fullPath = join(srcDir, item);
		if (!statSync(fullPath).isDirectory()) continue;

		const mainPath = join(fullPath, 'main.ts');
		// Check for main.ts (or allow main.js if you prefer)
		if (!existsSync(mainPath)) continue;

		console.log(`Building component: ${item}...`);

		try {
			await build({
				configFile: resolve(__dirname, 'vite.config.ts'),
				build: {
					emptyOutDir: false, // Don't wipe the whole dir, just overwrite files
					lib: {
						entry: mainPath,
						name: item.replace(/-/g, '_'),
						formats: ['iife'],
						fileName: () => `${item}/${item}.js`
					},
					rollupOptions: {
						// Ensure external deps are bundled if they are not explicitly externalized in base config
						// In this case we WANT them bundled, so we rely on default behavior or explicit includes if needed.
						// But we must clear manualChunks from the base config if strictly inheriting.
						output: {
							// Vital: force manualChunks to undefined to prevent code splitting based on previous config
							manualChunks: undefined,
							// Ensure assets are nested
							assetFileNames: (assetInfo) => {
								if (assetInfo.name === 'style.css') return `${item}/${item}.css`; // Rename style.css to match component
								return `${item}/[name].[ext]`;
							},
						}
					}
				}
			});
			console.log(`✓ Built ${item}`);
		} catch (e) {
			console.error(`✗ Failed to build ${item}:`, e);
			process.exit(1);
		}
	}
}

buildComponents();
