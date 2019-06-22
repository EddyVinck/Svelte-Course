<script>
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  export const products = [
    {
      id: "1",
      title: "A keyboard",
      price: 95.99
    }
  ];

  function addToCart(event) {
    console.log(event.detail); // the event data
  }
  function deleteProduct(event) {
    console.log(event.detail);
  }
</script>

{#each products as product}
  <Product on:add-to-cart={addToCart} on:delete={deleteProduct} {...product} />
{/each}

<Modal>
  <h1>Hello Modal!</h1>
</Modal>
