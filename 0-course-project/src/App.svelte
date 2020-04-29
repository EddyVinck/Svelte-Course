<script>
  import Header from "./ui/app-shell/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";
  import { meetupsStore as meetups } from "./meetups/meetups-store.js";

  let editMode = null;

  function handleAddMeetup() {
    editMode = false;
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
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:cancelmodal={cancelEdit} on:save={handleAddMeetup} />
  {/if}
  <MeetupList meetups={$meetups} />

</main>
