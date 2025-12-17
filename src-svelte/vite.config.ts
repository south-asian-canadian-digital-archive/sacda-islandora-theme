import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';
import { drupalSdcGenerator } from './drupal.build';

const IGNORE_DIR = ['lib', 'layout', 'app.css'];

function getEntries(srcPath: string) {
  const entries: Record<string, string> = {};
  const items = readdirSync(srcPath);

  for (const item of items) {
    if (IGNORE_DIR.includes(item)) {
      continue;
    }

    const fullPath = join(srcPath, item);

    if (statSync(fullPath).isDirectory()) {
      const mainPath = join(fullPath, 'main.ts');

      try {
        if (statSync(mainPath).isFile()) {
          entries[item] = mainPath;
        }
      } catch (e) {
        // file does not exist
      }
    }
  }

  return entries;
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    svelte({ compilerOptions: { customElement: true } }),
    drupalSdcGenerator({ src: 'src' })
  ],
  resolve: {
    alias: {
      $lib: resolve("./src/lib"),
    },
  },
  build: {
    outDir: resolve(__dirname, '../components'),
    emptyOutDir: false,
    cssCodeSplit: true,

    lib: {
      // map each entry to its desired bundle name
      entry: getEntries(resolve(__dirname, 'src')),

      formats: ['es'],

      // use the entry key when naming the output file
      fileName: (_format, entryName) => `${entryName}/${entryName}.js`
    },

    rolldownOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'style.css';

          return '[name]/[name].[ext]';
        }
      }
    }
  }
});
