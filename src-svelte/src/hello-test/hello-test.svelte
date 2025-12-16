<svelte:options customElement="hello-test" />

<script>
  import globalStyles from "../layout.css?inline";
  let { name = "World" } = $props();
</script>

<h1>Hello {name}!</h1>

<h2 id="shared-style-test">Shared Style Test</h2>
<h2 id="svelte-file-test">Svelte File Test</h2>
<h2 id="same-dir-css-test">Same Dir CSS Test</h2>

{@html `<style>${globalStyles}</style>`}

<style>
  #svelte-file-test {
    color: red;
  }
</style>
