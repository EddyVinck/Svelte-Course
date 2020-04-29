<script>
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn } from "svelte/easing";
  import { fade, fly, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  import Spring from "./Spring.svelte";

  const progress = tweened(0, {
    delay: 0,
    duration: 700,
    easing: cubicIn
  });

  setTimeout(() => {
    progress.set(0.5);
  }, 1000);

  let showParagraph = false;

  let boxes = [];
  let value;
  function addBox() {
    boxes = [value, ...boxes];
  }
  function discard(discardedElement) {
    boxes = boxes.filter(el => el !== discardedElement);
  }
</script>

<style>
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 10rem;
    height: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>

<!-- <progress value={$progress} /> -->
<!-- <Spring /> -->

<button on:click={() => (showParagraph = !showParagraph)}>
  toggle paragraph
</button>

{#if showParagraph}
  <p in:fade out:fly={{ x: -200 }}>can you see me?</p>
{/if}

<br />
<input type="text" bind:value />
<button on:click={addBox}>add box</button>

{#if showParagraph}
  {#each boxes as box (box)}
    <div
      animate:flip={{ delay: 0, duration: 300 }}
      transition:fly|local={{ duration: 400, y: -300, x: 20 }}
      on:click={discard.bind(this, box)}
      on:introstart={() => console.log('animation: adding the element starts')}
      on:introend={() => console.log('animation: adding the element ends')}
      on:outrostart={() => console.log('animation: removing the element starts')}
      on:outroend={() => console.log('animation: removing the element ends')}>
      {box}
    </div>
  {/each}
{/if}
