<script>
  import { tick } from "svelte";
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  let showModal = false;
  let modalIsClosable = false;

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

  let text = "This is some dummy text";

  function transformText(event) {
    const tabKey = 9;
    if (event.which !== tabKey) {
      return;
    }
    event.preventDefault(); // don't move to the next element
    const { selectionStart, selectionEnd, value } = event.target;

    // text is bound to the text area
    // this is done in the next micro-task in Svelte's own DOM update task
    text =
      value.slice(0, selectionStart) +
      value.slice(selectionStart, selectionEnd).toUpperCase() +
      value.slice(selectionEnd);

    // doesn't work, Svelte updates the dom after this is executed rendering it useless.
    // the cursor will be placed at the end and no text will be selected :(
    event.target.selectionStart = selectionStart;
    event.target.selectionEnd = selectionEnd;

    // something like afterUpdate might seem suitable, but regular lifecycle methods cannot be called within a function. Tick can, however.
    // Then will be executed after Svelte has executed its tasks
    tick().then(() => {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionEnd;
    });
  }
</script>

<button on:click={() => (showModal = true)}>Show modal</button>

{#each products as product}
  <Product on:add-to-cart={addToCart} on:delete={deleteProduct} {...product} />
{/each}

{#if showModal}
  <Modal
    on:modal-cancel={() => (showModal = false)}
    on:modal-close={() => (showModal = false)}
    let:didAgree={modalIsClosable}>
    <div slot="header">
      <h1>Hello Modal!</h1>
    </div>
    <p>This goes in the default slot!</p>
    <button
      slot="footer"
      disabled={!modalIsClosable}
      on:click={() => (showModal = false)}>
      Confirm
    </button>
  </Modal>
{/if}

<textarea rows="5" value={text} on:keydown={transformText} />
