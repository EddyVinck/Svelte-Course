<script>
  import { onDestroy } from "svelte";
  import { cartStore } from "./cart-store.js";
  import CartItem from "./CartItem.svelte";
  import { timerStore as timer } from "../UI/timer-store.js";

  let items = [];

  const unsubscribe = timer.subscribe(count => {
    console.log(`Cart: ${count}`);
  });

  /**
   * Instead of all this boilerplate, you can also use $cartStore instead of `items` in the loop.
   * This causes Svelte to declare the prefixed variable, and set up a store subscription that will be unsubscribed when appropriate.
   * See: https://svelte.dev/docs#4_Prefix_stores_with_$_to_access_their_values 👌
   */
  // const unsubscribe = cartStore.subscribe(storeItems => {
  //   console.log(storeItems);
  //   items = storeItems;
  // });

  // clean up the store to avoid memory leaks
  onDestroy(() => {
    if (unsubscribe && typeof unsubscribe === "function") unsubscribe();
  });
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>
    {#each $cartStore as item (item.id)}
      <CartItem id={item.id} title={item.title} price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
