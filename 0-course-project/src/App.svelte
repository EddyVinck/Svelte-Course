<script>
  import { onMount } from "svelte";
  import { firebase } from "./data/firebase.js";
  import Header from "./ui/app-shell/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import MeetupDetail from "./meetups/MeetupDetail.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";
  import Loader from "./ui/Loader.svelte";
  import ErrorModal from "./ui/Error.svelte";
  import { meetupsStore as meetups } from "./meetups/meetups-store.js";

  let editMode = null;
  let page = "overview"; // temporary fake routing
  let pageData = {};
  let isLoading = false;
  let isError = false;

  onMount(async () => {
    try {
      isLoading = true;
      const res = await fetch(`${firebase}.co/meetups.json`);
      if (!res || !res.ok) throw new Error("Fetching meetups failed");
      const data = await res.json();
      const meetupsData = Object.keys(data)
        .map(key => ({
          id: key,
          ...data[key]
        }))
        .reverse(); // firebase always stores at the end, but we want to show new meetups first
      meetups.createMany(meetupsData);
      isLoading = false;
    } catch (error) {
      isLoading = false;
      isError = true;
      console.error(error);
    }
  });

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
  {#if isError}
    <ErrorModal
      message="Could not fetch meetups. Firebase URL is probably incorrect if
      you're using an unprotected database."
      on:cancelmodal={() => {
        console.log('cancel error modal')((isError = false));
      }} />
  {/if}
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup
        id={pageData.id}
        on:cancelmodal={cancelEdit}
        on:save={handleSaveMeetup} />
    {/if}
    {#if isLoading}
      <Loader />
    {:else}
      <MeetupList
        on:edit={handleEdit}
        on:create={handleCreate}
        meetups={$meetups}
        on:showDetails={showDetails} />
    {/if}
  {:else if page === 'details' && pageData.id}
    <MeetupDetail id={pageData.id} on:close={goHome} />
  {:else}
    <p>page not found</p>
    <Button on:click={goHome}>Go home</Button>
  {/if}
</main>
