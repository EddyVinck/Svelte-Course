<script>
  import MeetupItem from "./MeetupItem.svelte";

  export let meetups = [];
</script>

<style>
  section {
    margin-top: 5rem;
  }
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section>
  {#each meetups as meetup (meetup.id)}
    <MeetupItem
      id={meetup.id}
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
      address={meetup.address}
      email={meetup.contactEmail}
      isFavorite={meetup.isFavorite} />
  {:else}
    <p>No meetups available</p>
  {/each}
</section>
