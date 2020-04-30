<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { meetupsStore as meetups } from "./meetups-store.js";
  import Button from "../ui/Button.svelte";
  import Badge from "../ui/Badge.svelte";
  import { firebase } from "../../config/firebase.js";

  export let id = "";
  export let title = "";
  export let subtitle = "";
  export let imageUrl = "";
  export let description = "";
  export let address = "";
  export let email = "";
  export let isFavorite;

  const dispatch = createEventDispatcher();
  async function handleToggleFavorite() {
    try {
      const payload = {
        method: "PATCH", // use PATCH to only override the values we provide to Firebase
        body: JSON.stringify({ isFavorite: !isFavorite }),
        headers: { "Content-Type": "application/json" }
      };
      const res = await fetch(`${firebase}/meetups/${id}.json`, payload);
      if (!res || !res.ok) throw new Error("could not toggle favorite");
      const data = await res.json();
      meetups.findByIdAndToggleFavorite(id);
    } catch (error) {
      console.error(error);
    }
  }
  function handleShowDetails() {
    console.log("click showing detail");
    dispatch("showDetails", id);
  }
  function handleEdit() {
    dispatch("edit", id);
  }
</script>

<style>
  article {
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    text-decoration: underline;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    min-height: 4rem;
  }
</style>

<article>
  <header>
    <h1 class:is-favorite={isFavorite}>
      {title}
      {#if isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt="" />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button on:click={handleEdit} mode="outline">Edit</Button>
    <Button href="mailto:{email}">Contact</Button>
    <Button href={`/meetup/${id}`}>Show Details</Button>
    <Button
      mode="outline"
      color={isFavorite ? null : 'success'}
      on:click={handleToggleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
  </footer>
</article>
