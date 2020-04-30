<script>
  import { fly } from "svelte/transition";
</script>

<style>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
  }
</style>

<div class="loading">
  <p in:fly={{ y: 100 }}>loading...</p>
</div>
