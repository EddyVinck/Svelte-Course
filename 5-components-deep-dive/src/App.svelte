<script>
  /**
   * Course section 6
   */
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let products = [
    {
      id: "my_id1",
      title: "So Good They Can't ignore you",
      price: 9.99
    }
  ];

  let showModal = false;
  let closable;
  function handleAddToCart(event) {
    console.log(event);
  }
  function handleDelete(event) {
    console.log(event);
  }
</script>

<button
  on:click={() => {
    showModal = true;
  }}>
  Show modal
</button>

{#if showModal}
  <Modal on:cancelmodal={() => (showModal = false)} let:didAgree={closable}>
    <h1>This is my modal!</h1>
    <button disabled={!closable}>Close it</button>
  </Modal>
{/if}

{#each products as product (product.id)}
  <Product
    on:addToCart={handleAddToCart}
    on:deleteProduct={handleDelete}
    {...product} />
{/each}
