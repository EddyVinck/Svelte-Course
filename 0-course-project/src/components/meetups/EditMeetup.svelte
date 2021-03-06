<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { meetupsStore as meetups } from "./meetups-store.js";
  import TextInput from "../ui/TextInput.svelte";
  import Button from "../ui/Button.svelte";
  import Modal from "../ui/Modal.svelte";
  import { isEmpty, isValidEmail } from "../../helpers/validation";
  import { firebase } from "../../config/firebase.js";

  const dispatch = createEventDispatcher();
  function cancel() {
    dispatch("cancelmodal");
  }

  export let id = null;

  let ref = null;

  onMount(() => {
    if (ref && typeof window !== "undefined") {
      ref.focus();
    }
  });

  onDestroy(() => {
    if (ref && typeof window !== "undefined") {
      ref.blur();
    }
  });

  // this approach is a bit different from the course
  let title = {
    id: "title",
    label: "Title",
    value: "",
    valid: false
  };
  let subtitle = {
    id: "subtitle",
    label: "Subtitle",
    value: "",
    valid: false
  };
  let address = {
    id: "address",
    label: "Address",
    value: "",
    valid: false
  };
  let description = {
    id: "description",
    label: "description",
    value: "",
    valid: false
  };
  let imageUrl = {
    id: "image",
    label: "image",
    value:
      "https://images.pexels.com/photos/34676/pexels-photo.jpg?auto=format%2Ccompress&amp;cs=tinysrgb&amp;h=750&amp;w=1260",
    valid: false
  };
  let contactEmail = {
    id: "contactEmail",
    label: "Contact email",
    value: "meetup@test.com",
    valid: false
  };

  let isEditingMeetup = false;
  if (id) {
    isEditingMeetup = meetups.findById(id);
    if (isEditingMeetup) {
      title.value = isEditingMeetup.title;
      subtitle.value = isEditingMeetup.subtitle;
      address.value = isEditingMeetup.address;
      description.value = isEditingMeetup.description;
      imageUrl.value = isEditingMeetup.imageUrl;
      contactEmail.value = isEditingMeetup.contactEmail;
    }
  }

  async function submitForm() {
    if (isFormValid) {
      const meetupData = {
        title: title.value,
        subtitle: subtitle.value,
        description: description.value,
        imageUrl: imageUrl.value,
        contactEmail: contactEmail.value,
        address: address.value
      };

      if (isEditingMeetup) {
        const payload = {
          method: "PATCH", // use PATCH to only override the values we provide to Firebase
          body: JSON.stringify({ ...meetupData }),
          headers: { "Content-Type": "application/json" }
        };
        const res = await fetch(`${firebase}/meetups/${id}.json`, payload);
        if (!res || !res.ok) throw new Error("oh no");
        meetups.findByIdAndUpdate(id, meetupData);
      } else {
        // the meetup is new
        try {
          const payload = {
            method: "POST",
            body: JSON.stringify({ ...meetupData, isFavorite: false }),
            headers: { "Content-Type": "application/json" }
          };
          const res = await fetch(`${firebase}/meetups.json`, payload);
          if (!res || !res.ok) throw new Error("oh no");
          const data = await res.json();
          const id = data.name; // from firebase

          meetups.createOne({ ...meetupData, isFavorite: false, id });
        } catch (error) {
          console.error(error);
        }
      }
      dispatch("save");
    }
  }

  function setValue(e, formField, valueProp = "value") {
    return { ...formField, [valueProp]: e.target.value };
  }

  // validation updates
  $: title = {
    ...title,
    valid: !isEmpty(title.value)
  };
  $: subtitle = {
    ...subtitle,
    valid: !isEmpty(subtitle.value)
  };
  $: address = {
    ...address,
    valid: !isEmpty(address.value)
  };
  $: imageUrl = {
    ...imageUrl,
    valid: !isEmpty(imageUrl.value)
  };
  $: contactEmail = {
    ...contactEmail,
    valid: isValidEmail(contactEmail.value)
  };
  $: description = {
    ...description,
    valid: !isEmpty(description.value)
  };
  $: isFormValid =
    title.valid &&
    subtitle.valid &&
    address.valid &&
    imageUrl.valid &&
    contactEmail.valid &&
    description.valid;

  async function handleDelete() {
    try {
      const payload = {
        method: "DELETE"
      };
      const res = await fetch(`${firebase}/meetups/${id}.json`, payload);
      if (!res || !res.ok) throw new Error("could not delete meetup");
      meetups.findByIdAndDelete(id);
      dispatch("save");
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="New meetup" on:cancelmodal>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      bind:ref
      {...title}
      on:input={event => (title = setValue(event, title))} />
    <TextInput
      {...subtitle}
      on:input={event => (subtitle = setValue(event, subtitle))} />
    <TextInput
      {...address}
      on:input={event => (address = setValue(event, address))} />
    <TextInput
      {...imageUrl}
      on:input={event => (imageUrl = setValue(event, imageUrl))} />
    <TextInput
      {...contactEmail}
      on:input={event => (contactEmail = setValue(event, contactEmail))} />
    <TextInput
      {...description}
      controlType="textarea"
      on:input={event => (description = setValue(event, description))} />
  </form>
  <div slot="footer">
    <Button type="button" disabled={!isFormValid} on:click={submitForm}>
      Save
    </Button>
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    {#if id}
      <Button on:click={handleDelete} mode="outline">Delete</Button>
    {/if}
  </div>
</Modal>
