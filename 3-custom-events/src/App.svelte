<script>
  import Product from "./Product.svelte";
</script>

<Product
  on:add-to-cart={e => alert('add to cart!')}
  on:delete={e => alert('delete!')}
  on:click={e => alert('Hello world')}
  productTitle="A keyboard" />
