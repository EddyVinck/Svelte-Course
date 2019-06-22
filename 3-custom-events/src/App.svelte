<script>
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let showModal = false;

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

<button on:click={() => (showModal = true)}>Show modal</button>

{#each products as product}
  <Product on:add-to-cart={addToCart} on:delete={deleteProduct} {...product} />
{/each}

{#if showModal}
  <Modal
    on:modal-cancel={() => (showModal = false)}
    on:modal-close={() => (showModal = false)}>
    <div slot="header">
      <h1>Hello Modal!</h1>
    </div>
    <p>This goes in the default slot!</p>
    <button on:click={() => (showModal = false)} slot="footer">Confirm</button>
  </Modal>
{/if}
