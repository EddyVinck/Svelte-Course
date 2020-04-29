<script>
  import Header from "./ui/app-shell/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import MeetupDetail from "./meetups/MeetupDetail.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";
  import { meetupsStore as meetups } from "./meetups/meetups-store.js";

  let editMode = null;
  let page = "overview"; // temporary fake routing
  let pageData = {};

  function handleAddMeetup() {
    editMode = false;
  }

  function cancelEdit() {
    editMode = false;
  }

  function showDetails({ detail: id }) {
    console.log("showing details for " + id);
    pageData = { id };
    page = "details";
  }

  function goHome() {
    page = "overview";
    pageData = {};
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
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
    </div>
    {#if editMode === 'add'}
      <EditMeetup on:cancelmodal={cancelEdit} on:save={handleAddMeetup} />
    {/if}
    <MeetupList meetups={$meetups} on:showDetails={showDetails} />
  {:else if page === 'details' && pageData.id}
    <MeetupDetail id={pageData.id} on:close={goHome} />
  {:else}
    <p>page not found</p>
    <Button on:click={goHome}>Go home</Button>
  {/if}

</main>
