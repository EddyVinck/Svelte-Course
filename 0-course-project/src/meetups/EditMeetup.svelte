<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../ui/TextInput.svelte";
  import Button from "../ui/Button.svelte";
  import Modal from "../ui/Modal.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

  const dispatch = createEventDispatcher();
  function cancel() {
    dispatch("cancelmodal");
  }

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

  function submitForm() {
    if (isFormValid) {
      dispatch("save", {
        title: title.value,
        subtitle: subtitle.value,
        address: address.value,
        description: description.value,
        imageUrl: imageUrl.value,
        contactEmail: contactEmail.value
      });
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
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="New meetup" on:cancelmodal>
  <form on:submit|preventDefault={submitForm}>
    <TextInput {...title} on:input={e => (title = setValue(e, title))} />
    <TextInput
      {...subtitle}
      on:input={e => (subtitle = setValue(e, subtitle))} />
    <TextInput {...address} on:input={e => (address = setValue(e, address))} />
    <TextInput
      {...imageUrl}
      on:input={e => (imageUrl = setValue(imageUrl, e))} />
    <TextInput
      {...contactEmail}
      on:input={e => (contactEmail = setValue(e, contactEmail))} />
    <TextInput
      {...description}
      controlType="textarea"
      on:input={e => (description = setValue(e, description))} />
  </form>
  <div slot="footer">
    <Button type="button" disabled={!isFormValid} on:click={submitForm}>
      Save
    </Button>
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
  </div>
</Modal>
