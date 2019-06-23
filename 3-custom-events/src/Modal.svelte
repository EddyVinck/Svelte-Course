<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate
  } from "svelte";
  const dispatch = createEventDispatcher();

  let agreed = false;
  let autoScroll = false;

  onMount(() => {
    // do work such as fetching data asynchronously
    console.log("4. onMount");
  });

  console.log("1. script executed");

  onDestroy(() => {
    // cleanup work
    console.log("5. onDestroy");
  });

  beforeUpdate(() => {
    console.log("2. beforeUpdate");
    autoScroll = agreed;
  });

  afterUpdate(() => {
    console.log("3. afterUpdate");

    if (autoScroll) {
      const m = document.querySelector(".modal");
      m.scrollTo(0, m.scrollHeight);
    }
  });
</script>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    padding: 1rem;
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 15vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: scroll;
  }
  header {
    border-bottom: 1px solid #ccc;
  }
</style>

<div
  class="backdrop"
  on:click={() => {
    dispatch('modal-cancel');
  }} />
<div class="modal">
  <header>
    <slot name="header" />
  </header>
  <div class="content">
    <slot />
  </div>
  <div class="disclaimer">
    <p>Before you close you need to agree to our terms</p>
    <button on:click={() => (agreed = true)}>Agree</button>
  </div>
  <footer>
    <slot name="footer" didAgree={agreed}>
      <p>Slot default content! 👍</p>
      <button on:click={() => dispatch('modal-close')} disabled={!agreed}>
        Close modal
      </button>
    </slot>
  </footer>
</div>
