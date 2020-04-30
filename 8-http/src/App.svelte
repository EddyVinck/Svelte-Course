<script>
  import { onMount } from "svelte";
  import { hobbyStore } from "./hobby-store.js";
  const url = "https://__db-name-here__.firebaseio.com";
  let hobbies = [];
  let hobby;
  let isLoading = false;

  async function loadHobbies() {
    try {
      isLoading = true;
      const res = await fetch(`${url}/hobbies.json`);
      if (!res || !res.ok) {
        throw new Error("failed :(");
      }
      const data = await res.json();
      if (data) {
        hobbyStore.setHobbies(Object.values(data));
        isLoading = false;
        return hobbies;
      }
    } catch (error) {
      isLoading = false;
      console.error(error);
    }
  }

  onMount(loadHobbies);

  async function handleCreateHobby() {
    const endpoint = `${url}/hobbies.json`;

    try {
      isLoading = true;
      const payload = {
        method: "POST",
        body: JSON.stringify(hobby),
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await fetch(endpoint, payload);
      if (!res || !res.ok) {
        throw new Error("failed :(");
      }
    } catch (error) {
      console.error(error);
    }
    hobby = "";
    await loadHobbies();
    isLoading = false;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <form on:submit|preventDefault={handleCreateHobby}>
    <label for="hobby">Hobby</label>
    <input type="text" id="hobby" bind:value={hobby} />
    <button>Add hobby</button>
  </form>
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ol>
      {#each $hobbyStore as hobby (hobby)}
        <li>{hobby}</li>
      {/each}
    </ol>
  {/if}
</main>
