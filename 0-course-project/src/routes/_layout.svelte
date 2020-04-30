<script>
  import Header from "../components/ui/app-shell/Header.svelte";
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  <slot />
</main>
