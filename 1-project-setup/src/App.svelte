<script>
  import ContactCard from "./ContactCard.svelte";

  export let name;
  export let title = "Developer";
  export let description = "What a nerd";
  export let age;
  export let image =
    "https://media.licdn.com/dms/image/C5103AQHhLR-I799HmA/profile-displayphoto-shrink_200_200/0?e=1565827200&v=beta&t=FNnt_b3-GBMDD4q7ZqRPTSPHNHL92GzNobmm52bTows";

  // let upperCaseName; // not required
  $: upperCaseName = name.toUpperCase();

  function incrementAge() {
    age += 1;
  }
  function changeName() {
    name = "Eddy";
  }
  function nameInput(event) {
    const enteredValue = event.target.value;
    name = enteredValue;
  }
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {upperCaseName}, my age is {age}</h1>
<button on:click={incrementAge}>Birthday!</button>
<button on:click={changeName}>Change name</button>
<!-- <input type="text" value={name} on:input={nameInput} /> -->
<label>
  name
  <input type="text" bind:value={name} />
</label>
<label>
  title
  <input type="text" bind:value={title} />
</label>
<label>
  description
  <textarea type="text" bind:value={description} />
</label>
<label>
  image
  <input type="text" bind:value={image} />
</label>

<!-- Custom component -->
<ContactCard userName={name} jobTitle={title} {description} userImage={image} />
