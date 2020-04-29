<script>
  import Cart from "./Cart/Cart.svelte";
  import Products from "./Products/Products.svelte";
  import Button from "./UI/Button.svelte";
  import { timerStore as timer } from "./UI/timer-store.js";
  let showCart = true;

  // timer.subscribe(count => {
  //   console.log(`App: ${count}`);
  // });
</script>

<Button
  on:click={() => {
    showCart = !showCart;
  }}>
  Toggle cart
</Button>

{#if showCart}
  <Cart />
{/if}
<Products />

<p>App Timer: {$timer}</p>
