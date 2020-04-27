<script>
  import Header from "./ui/app-shell/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";

  import { exampleMeetups } from "./data/example-meetups.js";

  let editMode = null;

  let meetups = [...exampleMeetups];

  function addMeetup({ detail }) {
    console.log(event);

    const newMeetup = {
      id: Math.random().toString(),
      title: detail.title,
      subtitle: detail.subtitle,
      description: detail.description,
      imageUrl: detail.imageUrl,
      contactEmail: detail.contactEmail,
      address: detail.address
    };

    meetups = [newMeetup, ...meetups];
    editMode = false;
  }

  function handleToggleFavorite({ detail: id }) {
    // spread it to make a copy instead of getting the reference
    const updatedMeetup = { ...meetups.find(meetup => meetup.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex(meetup => meetup.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = false;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>Add Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:cancelmodal={cancelEdit} on:saveevent={addMeetup} />
  {/if}
  <MeetupList {meetups} on:togglefavorite={handleToggleFavorite} />

</main>
