<script>
  import {
    createEventDispatcher,
    onMount,
    onDestroy,
    beforeUpdate,
    afterUpdate
  } from "svelte";

  const dispatch = createEventDispatcher();

  export let title = "";
  let agreed = false;

  function closeModal() {
    dispatch("cancelmodal");
  }

  /** life cycles
   *  great for loading data or for side effects like changing scroll position''s'
   */
  onMount(() => console.log("onMount")); // -> (3) once this entire script has finished executing (mount is finished)
  onDestroy(() => console.log("onDestroy")); // -> before unmount
  beforeUpdate(() => console.log("beforeUpdate")); // (2)
  afterUpdate(() => console.log("afterUpdate"));

  console.log("script executed"); // -> (1) every time them modal appears
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 10vh;
    left: 10%;
    width: 80%;
    max-height: 80vh;
    background: white;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    overflow: auto;
  }

  h1 {
    padding: 1rem;
    margin: 0;
    border-bottom: 1px solid #ccc;
    font-family: "Roboto Slab", sans-serif;
  }

  .content {
    padding: 1rem;
  }

  footer {
    padding: 1rem;
  }

  @media (min-width: 768px) {
    .modal {
      width: 40rem;
      left: calc(50% - 20rem);
    }
  }
</style>

<div class="modal-backdrop" on:click={closeModal} />
<div class="modal">
  <h1>{title}</h1>
  <div class="content">
    <slot didAgree={agreed} />
  </div>
  <div class="disclaimer">
    plz agree first
    <button on:click={() => (agreed = true)}>ok I agree</button>
  </div>
  <footer>
    <slot name="footer">
      <button disabled={!agreed} on:click={closeModal}>Close</button>
    </slot>
  </footer>
</div>
