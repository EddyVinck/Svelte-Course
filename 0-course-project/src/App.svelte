<script>
  import Header from "./ui/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import EditMeetup from "./meetups/EditMeetup.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";

  let editMode = null;

  let meetups = [
    {
      id: "m1",
      title: "Eindhoven Front-end Meetup: Lightning Talks",
      subtitle: "ISAAC",
      description:
        "Lightning talks?! Yes! This time our meet-up will take a different approach: Short, powerful lightning talks (max. 10 minutes) and more time (10 - 20 minutes) for questions and conversations.",
      imageUrl:
        "https://images.pexels.com/photos/34676/pexels-photo.jpg?auto=format%2Ccompress&cs=tinysrgb&h=750&w=1260",
      address: "Marconilaan 16, Eindhoven",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "A Refreshing Frontend Meetup!",
      subtitle: "Frontmen",
      description:
        "Eindhoven.js is hosting this evening with great talks about MagicMove by Hein Rutjes (ReactEurope preview!) and Insights on GraphQL by Albert Groothedde.",
      imageUrl:
        "https://images.pexels.com/photos/34676/pexels-photo.jpg?auto=format%2Ccompress&cs=tinysrgb&h=750&w=1260",
      address: "Kick Offices, Eindhoven",
      contactEmail: "code@test.com",
      isFavorite: false
    }
  ];

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
    <EditMeetup on:saveevent={addMeetup} />
  {/if}
  <MeetupList {meetups} on:togglefavorite={handleToggleFavorite} />

</main>
