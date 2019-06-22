<script>
  import { createEventDispatcher } from "svelte";
  export let productTitle;

  const dispatch = createEventDispatcher();

  function addToCart() {
    const productData = {};
    dispatch("add-to-cart", productData);
  }
</script>

<article>
  <h1>{productTitle}</h1>
  <!-- Without the handler function, the event is forwarded -->
  <button on:click={addToCart}>Add to cart</button>
  <button on:click={() => dispatch('delete', 'id1')}>Delete product</button>
</article>
