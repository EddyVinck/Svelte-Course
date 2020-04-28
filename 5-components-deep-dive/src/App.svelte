<script>
  /**
   * Course section 6
   */
  import { tick } from "svelte";
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
  let text = "This is some dummy text";
  function transformText(e) {
    if (e.which !== 9) return; // tab key
    e.preventDefault();

    const { selectionStart, selectionEnd, value } = e.target;
    const stringStart = value.slice(0, selectionStart);
    const selection = value.slice(selectionStart, selectionEnd).toUpperCase();
    const stringEnd = value.slice(selectionEnd);
    const newText = `${stringStart}${selection}${stringEnd}`;

    text = newText;

    // Keep texxt selection the same after the next tick
    tick().then(() => {
      e.target.selectionStart = selectionStart;
      e.target.selectionEnd = selectionEnd;
    });

    return;
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

<textarea rows="10" value={text} on:keydown={transformText} />

{#each products as product (product.id)}
  <Product
    on:addToCart={handleAddToCart}
    on:deleteProduct={handleDelete}
    {...product} />
{/each}
