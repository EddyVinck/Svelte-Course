<script>
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import Button from "../ui/Button.svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  const dispatch = createEventDispatcher();

  export let meetups = [];

  let filters = { favoritesOnly: false };

  function handleFilter({ detail: filter }) {
    const newFilters = { ...filters };
    newFilters.favoritesOnly = filter === "favorites";
    filters = newFilters;
  }

  $: filteredMeetups = meetups.filter(meetup => {
    if (filters.favoritesOnly && !meetup.isFavorite) return false;
    return meetup;
  });
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

<section class="meetup-controls">
  <MeetupFilter on:filter={handleFilter} />
  <Button on:click={() => dispatch('create')}>New Meetup</Button>
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
        on:showDetails
        on:edit />
    </div>
  {:else}
    <p>No meetups available</p>
  {/each}
</section>
