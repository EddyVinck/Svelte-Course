<script context="module">
  // Sapper looks for this function. What is returned is passed to this page as props.
  // That means { fetchedMeetups } in this case.
  export async function preload(page) {
    try {
      const res = await this.fetch(`${firebase}/meetups.json`);
      if (!res || !res.ok) throw new Error("Fetching meetups failed");
      const data = await res.json();
      const fetchedMeetups = Object.keys(data)
        .map(key => ({
          id: key,
          ...data[key]
        }))
        .reverse(); // firebase always stores at the end, but we want to show new meetups first

      return { fetchedMeetups };
    } catch (error) {
      this.error(500, error);
    }
  }
</script>

<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Button from "../components/ui/Button.svelte";
  import Loader from "../components/ui/Loader.svelte";
  import MeetupItem from "../components/meetups/MeetupItem.svelte";
  import MeetupFilter from "../components/meetups/MeetupFilter.svelte";
  import EditMeetup from "../components/meetups/EditMeetup.svelte";
  import { firebase } from "../config/firebase.js";
  import { meetupsStore } from "../components/meetups/meetups-store.js";
  const dispatch = createEventDispatcher();

  export let fetchedMeetups;

  let listedMeetups = fetchedMeetups; // in the course this is initialized as an empty array, which prevents the meetups from being rendered on the server.

  let editMode;
  let pageData = {};
  let isLoading = false;
  let isError = false;

  let filters = { favoritesOnly: false };

  function handleFilter({ detail: filter }) {
    const newFilters = { ...filters };
    newFilters.favoritesOnly = filter === "favorites";
    filters = newFilters;
  }

  let unsubscribe;
  onMount(() => {
    // store the fetched meetups in the store and start listening to the store instead
    unsubscribe = meetupsStore.subscribe(meetups => {
      listedMeetups = meetups;
    });
    meetupsStore.initialize(fetchedMeetups);
  });
  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  $: filteredMeetups = listedMeetups.filter(meetup => {
    if (filters.favoritesOnly && !meetup.isFavorite) return false;
    return meetup;
  });

  function handleSaveMeetup() {
    editMode = false;
    pageData = {};
  }

  function cancelEdit() {
    editMode = false;
    pageData = {};
  }

  function handleCreate() {
    editMode = "edit";
  }
  function handleEdit({ detail: id }) {
    editMode = "edit";
    pageData.id = id;
  }
</script>

<style>
  section {
    margin-top: 2rem;
  }
  .meetup-list {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
  .meetup-controls {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    width: "100%";
    max-width: 100%;
  }

  @media (min-width: 768px) {
    .meetup-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>ALl meetups</title>
</svelte:head>

{#if editMode === 'edit'}
  <EditMeetup
    id={pageData.id}
    on:cancelmodal={cancelEdit}
    on:save={handleSaveMeetup} />
{/if}
{#if isLoading}
  <Loader />
{:else}
  <section class="meetup-controls">
    <MeetupFilter on:filter={handleFilter} />
    <Button on:click={handleCreate}>New Meetup</Button>
  </section>
  <section class="meetup-list">
    {#each filteredMeetups as meetup (meetup.id)}
      <div animate:flip={{ duration: 300 }} transition:scale>
        <MeetupItem
          id={meetup.id}
          title={meetup.title}
          subtitle={meetup.subtitle}
          imageUrl={meetup.imageUrl}
          description={meetup.description}
          address={meetup.address}
          email={meetup.contactEmail}
          isFavorite={meetup.isFavorite}
          on:edit={handleEdit} />
      </div>
    {:else}
      <p>No meetups available</p>
    {/each}
  </section>
{/if}
