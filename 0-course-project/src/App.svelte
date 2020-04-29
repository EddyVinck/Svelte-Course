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

  function handleSaveMeetup() {
    editMode = false;
    pageData = {};
  }

  function cancelEdit() {
    editMode = false;
    pageData = {};
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
  function handleCreate() {
    editMode = "edit";
  }
  function handleEdit({ detail: id }) {
    editMode = "edit";
    pageData.id = id;
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
    {#if editMode === 'edit'}
      <EditMeetup
        id={pageData.id}
        on:cancelmodal={cancelEdit}
        on:save={handleSaveMeetup} />
    {/if}
    <MeetupList
      on:edit={handleEdit}
      on:create={handleCreate}
      meetups={$meetups}
      on:showDetails={showDetails} />
  {:else if page === 'details' && pageData.id}
    <MeetupDetail id={pageData.id} on:close={goHome} />
  {:else}
    <p>page not found</p>
    <Button on:click={goHome}>Go home</Button>
  {/if}

</main>
