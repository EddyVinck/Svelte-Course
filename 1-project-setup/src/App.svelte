<script>
  import ContactCard from "./ContactCard.svelte";

  export let name;
  export let title = "Developer";
  export let description = "No description.";
  export let age;
  export let avatar = "";

  // let formattedName; // not required
  $: formattedName = name;
  $: if (name.toUpperCase() === "EDDY VINCK") {
    age = 24;
  }

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

<h1>Hello {formattedName}, my age is {age}</h1>
<button on:click={incrementAge}>🎂 Birthday!</button>
<button on:click={changeName}>Change name</button>
<!-- 
  This is two-way binding without `bind`
  <input type="text" value={name} on:input={nameInput} /> 
-->
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
  <input type="text" bind:value={avatar} />
</label>

<!-- Custom component -->
<!-- {description} is the same thing as description={description} -->
<ContactCard
  userName={formattedName}
  jobTitle={title}
  {description}
  userImage={avatar} />
