<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let selectedButton = "all";
</script>

<style>
  div {
    font-size: 0px;
  }
  button {
    background: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }
  button:focus {
    outline: none;
  }
  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }
  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }
  button:hover,
  button:active,
  button.active {
    background: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>

<div>
  <button
    class:active={selectedButton === 'all'}
    on:click={() => {
      dispatch('filter', 'all');
      selectedButton = 'all';
    }}>
    All
  </button>
  <button
    class:active={selectedButton === 'favorites'}
    on:click={() => {
      dispatch('filter', 'favorites');
      selectedButton = 'favorites';
    }}>
    Favorites
  </button>
</div>
