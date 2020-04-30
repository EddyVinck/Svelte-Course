<script context="module">
  // this only runs once, unlike the other script which runs whenever this component mounts
  console.log("hey");

  // this can be used to share data between components of the same type
</script>

<script>
  import Product from "./Product.svelte";
  import CartItem from "./CartItem.svelte";
  export let name;

  let showProduct = true;

  const prod = { c: Product, title: "test title", id: "p1" };
  const cart = { c: CartItem, title: "test title 2", id: "p2" };
  let picked = prod;
  let rendered = { ...picked };

  function toggle() {
    if (picked.c === Product) {
      picked = cart;
    } else {
      picked = prod;
    }
  }

  $: {
    delete rendered.c;
  }
</script>

<style>

</style>

<button on:click={toggle}>toggle</button>

<svelte:component this={picked.c} {...rendered} />

{#if false}
  <!-- use svelte:self for recursive components -->
  <svelte:self />
{/if}
<!-- this gives you access to the window object (although accessing it through "regular" code is this possible) -->
<svelte:window />
<svelte:body />
<svelte:head>
  <title>this is in the head tag</title>
</svelte:head>
<!-- {#if showProduct}
  <Product title="test product" id="1" />
{:else}
  <CartItem title="another product" id="2" />
{/if} -->
