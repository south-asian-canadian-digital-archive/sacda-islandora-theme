<svelte:options customElement="hello-test" />

<script>
  import styles from "../layout.css?inline";
  let { name = "World" } = $props();
</script>

<h1>Hello {name}!</h1>
<h2>Shared Style Test</h2>

{@html `<style>${styles}</style>`}