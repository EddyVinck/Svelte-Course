<script>
  import { createEventDispatcher } from "svelte";
  export let title = "";
  export let price = 10;
  export let isBestseller = false;
  export let id;

  const dispatch = createEventDispatcher();
</script>

<article>
  <h1>{title}</h1>
  <p>${price}</p>
  {#if isBestseller}
    <span>BESTSELLER BABYYY</span>
  {/if}
  <button on:click={() => dispatch('addToCart', { id })}>Add to cart</button>
  <button on:click={() => dispatch('deleteProduct', { id })}>Delete</button>
</article>
