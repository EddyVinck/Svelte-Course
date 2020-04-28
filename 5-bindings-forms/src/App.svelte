<script>
  /**
   * Module 8 of the course
   */
  import CustomInput from "./CustomInput.svelte";
  import Toggle from "./Toggle.svelte";
  let val = "Eddy";
  let price;
  let favoriteColor;

  $: console.log(val);
  $: console.log(selectedOption);
  $: console.log(toggleInput);

  let selectedOption = 1;

  function setValue(event) {
    val = event.target.value;
  }

  let selectValue;
  $: console.log(selectValue);

  let userNameInput;
  let someDiv;
  function saveData() {
    console.dir(userNameInput);
    console.dir(someDiv);
    console.log(userNameInput.value);
  }

  let toggleInput;
</script>

<!-- <input type="text" value={val} on:input={setValue} /> -->

<input type="text" bind:value={val} />

<Toggle bind:this={toggleInput} bind:chosenOption={selectedOption} />

<input
  type="number"
  value={price}
  on:input={event => console.log(typeof event.target.value, '1' + event.target.value)} />

<h1>Favorite color?</h1>
<label>
  <input type="radio" value="red" name="color" bind:group={favoriteColor} />
  red
</label>
<label>
  <input type="radio" value="green" name="color" bind:group={favoriteColor} />
  green
</label>
<label>
  <input type="radio" value="blue" name="color" bind:group={favoriteColor} />
  blue
</label>

<select bind:value={selectValue}>
  <option value="red">red</option>
  <option value="green">green</option>
  <option value="blue">blue</option>
</select>

<input type="text" bind:this={userNameInput} />
<button on:click={saveData}>Save</button>

<div bind:this={someDiv} />
