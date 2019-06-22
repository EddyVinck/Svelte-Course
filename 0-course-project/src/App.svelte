<script>
  import Header from "./ui/Header.svelte";
  import MeetupList from "./meetups/MeetupList.svelte";
  import TextInput from "./ui/TextInput.svelte";
  import Button from "./ui/Button.svelte";

  let title = "My test meetup";
  let subtitle = "This is going to be so much fun!";
  let address = "Nerdstreet 34th";
  let description =
    "Listen to some nerds talking about tech and talk to some nerds about that tech afterwards. Also, Pizza! 🍕";
  let imageUrl =
    "https://images.pexels.com/photos/34676/pexels-photo.jpg?auto=format%2Ccompress&amp;cs=tinysrgb&amp;h=750&amp;w=1260";
  let contactEmail = "meetup@test.com";

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
      contactEmail: "code@test.com"
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
      contactEmail: "code@test.com"
    }
  ];

  function addMeetup() {
    //
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      contactEmail,
      address
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  form {
    max-width: 90%;
    width: 30rem;
    margin: auto;
  }
</style>

<Header />
<h1>Time for a project!</h1>

<main>

  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      value={title}
      on:input={event => {
        title = event.target.value;
      }} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      value={subtitle}
      on:input={event => {
        subtitle = event.target.value;
      }} />
    <TextInput
      id="address"
      label="Address"
      value={address}
      on:input={event => {
        address = event.target.value;
      }} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      value={imageUrl}
      on:input={event => {
        imageUrl = event.target.value;
      }} />
    <TextInput
      id="contactEmail"
      label="Contact Email"
      value={contactEmail}
      on:input={event => {
        contactEmail = event.target.value;
      }} />
    <TextInput
      controlType="textarea"
      id="description"
      label="Description"
      value={description}
      on:input={event => {
        description = event.target.value;
      }} />
    <Button type="submit" text="Save" />
  </form>
  <MeetupList {meetups} />

</main>
