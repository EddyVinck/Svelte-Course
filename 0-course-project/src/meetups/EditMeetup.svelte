<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../ui/TextInput.svelte";
  import Button from "../ui/Button.svelte";
  import Modal from "../ui/Modal.svelte";

  const dispatch = createEventDispatcher();

  let title = "My test meetup";
  let subtitle = "This is going to be so much fun!";
  let address = "Nerdstreet 34th";
  let description =
    "Listen to some nerds talking about tech and talk to some nerds about that tech afterwards. Also, Pizza! 🍕";
  let imageUrl =
    "https://images.pexels.com/photos/34676/pexels-photo.jpg?auto=format%2Ccompress&amp;cs=tinysrgb&amp;h=750&amp;w=1260";
  let contactEmail = "meetup@test.com";

  function submitForm() {
    console.log("submit form");
    dispatch("saveevent", {
      title,
      subtitle,
      address,
      description,
      imageUrl,
      contactEmail
    });
  }

  function cancel() {
    dispatch("cancelmodal");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit meetup data" on:cancelmodal>
  <form on:submit|preventDefault={submitForm}>
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
  </form>
  <div slot="footer">
    <Button type="button" on:click={submitForm}>Save</Button>
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
  </div>
</Modal>
