<script>
  import CustomInput from "./CustomInput.svelte";
  import Toggle from "./Toggle.svelte";
  let value = "Eddy";
  let selectedOption = 2;
  let price = 0;
  let boundPrice = 0; // binding will convert the e.target.value back to a number!
  let agreed = false;
  let favoriteColor = "Blue";
  let favoriteColors = ["Blue", "Green"];
  let selectedFavoriteColor = "Blue";
  let thisBinding;

  // form validation example
  let formIsValid = false;
  let enteredEmail = "";
  $: validEnteredEmail = enteredEmail.includes("@");
  $: if (validEnteredEmail) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  function setValue(e) {
    value = e.target.value;
  }

  function saveData(e) {
    console.log(thisBinding.value);
  }

  $: console.log(selectedOption);
  $: console.log(price, boundPrice);
  $: console.log(agreed);
  $: console.log(favoriteColor);
</script>

<style>
  fieldset {
    margin-bottom: 1rem;
  }
  input.invalid {
    border-color: red;
  }
</style>

<h1>Bindings & Forms</h1>
<!-- <input type="text" {value} on:input={setValue} />
is the same as
<input type="text" bind:value /> -->
<CustomInput type="text" bind:value />
<br />
<!-- you can bind to your own props as well -->
<Toggle bind:chosenOption={selectedOption} />

<input
  type="number"
  value={price}
  on:input={e => {
    console.log(e.target.value);
    price = e.target.value;
  }} />

<input type="number" bind:value={boundPrice} />

<label>
  Agree to terms?
  <input bind:checked={agreed} type="checkbox" />
</label>

<fieldset>
  <legend>Favorite color</legend>
  <label>
    <input bind:group={favoriteColor} type="radio" name="color" value="Red" />
    Red
  </label>
  <label>
    <input bind:group={favoriteColor} type="radio" name="color" value="Green" />
    Green
  </label>
  <label>
    <input bind:group={favoriteColor} type="radio" name="color" value="Blue" />
    Blue
  </label>
</fieldset>

<fieldset>
  <legend>Favorite colors (select multiple)</legend>
  <label>
    <input
      bind:group={favoriteColors}
      type="checkbox"
      name="color"
      value="Red" />
    Red
  </label>
  <label>
    <input
      bind:group={favoriteColors}
      type="checkbox"
      name="color"
      value="Green" />
    Green
  </label>
  <label>
    <input
      bind:group={favoriteColors}
      type="checkbox"
      name="color"
      value="Blue" />
    Blue
  </label>
</fieldset>

<select bind:value={selectedFavoriteColor} name="" id="">
  <!-- You can even bind to object values here, not just strings -->
  <option value="Red">Red</option>
  <option value="Green">Green</option>
  <option value="Blue">Blue</option>
</select>

<br />
<!-- you can also bind:this to custom components -->
<input type="text" bind:this={thisBinding} />
<button on:click={saveData}>send it</button>

<form on:submit|preventDefault>
  <input
    type="email"
    bind:value={enteredEmail}
    class:invalid={!validEnteredEmail} />
  <button type="submit" disabled={!formIsValid}>save</button>
</form>
