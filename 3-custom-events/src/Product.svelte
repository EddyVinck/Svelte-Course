<script>
  import { createEventDispatcher } from "svelte";
  export let title;
  export let price;
  export let bestSeller = false;

  const dispatch = createEventDispatcher();
  function addToCart() {
    const productData = {
      id: "lkjsdfkldsj123"
    };
    dispatch("add-to-cart", productData);
  }
</script>

<article>
  <h1>{title}</h1>
  <h2>${price}</h2>

  {#if bestSeller}
    <h3>Bestseller!!</h3>
  {/if}
  <!-- Without the handler function, the event is forwarded -->
  <button on:click={addToCart}>Add to cart</button>
  <button on:click={() => dispatch('delete', 'id1')}>Delete product</button>
</article>
