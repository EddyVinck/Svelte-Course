<script>
  import MeetupItem from "./MeetupItem.svelte";

  export let meetups = [];
</script>

<style>
  section {
    margin-top: 5rem;
  }
</style>

<section>
  {#each meetups as meetup (meetup.id)}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
      address={meetup.address}
      email={meetup.contactEmail} />
  {:else}
    <p>No meetups available</p>
  {/each}
</section>
