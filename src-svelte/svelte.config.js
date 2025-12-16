import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
// import adapter from '@sveltejs/adapter-auto'

/** @type {import("@sveltejs/vite-plugin-svelte").SvelteConfig} */
export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  compilerOptions: {
    customElement: true,
  },
  // kit: {
  //   adapter: adapter()
  // }
}
