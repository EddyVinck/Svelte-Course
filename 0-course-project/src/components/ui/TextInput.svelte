<script>
  export let type = "text";
  export let controlType = "input";
  export let id;
  export let label;
  export let rows = null;
  export let value;
  export let valid = true;
  export let validMessage = `Please enter a valid ${label.toLowerCase()}.`;
  export let touched = false;
  export let ref = null;

  function setTouched() {
    touched = true;
  }

  $: shouldShowError = touched && !valid;
</script>

<style>
  input,
  textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
  }

  input:focus,
  textarea:focus {
    border-color: #e40763;
    outline: none;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  .form-control {
    padding: 0.5rem 0;
    width: 100%;
    margin: 0.25rem 0;
  }
  .invalid {
    border-color: red;
    background-color: #ffcee3;
  }
  .error {
    color: red;
    margin: 0.25rem 0;
  }
</style>

<div class="form-control">
  <label for={id}>{label}</label>
  {#if controlType === 'textarea'}
    <!-- on:input without a handler gets forwarded to the parent component -->
    <textarea
      bind:this={ref}
      class:invalid={shouldShowError}
      {id}
      {value}
      on:input
      on:blur={setTouched} />
  {:else}
    <input
      bind:this={ref}
      class:invalid={shouldShowError}
      {type}
      {id}
      {value}
      {rows}
      on:input
      on:blur={setTouched} />
  {/if}
  {#if validMessage && shouldShowError}
    <p class="error">{validMessage}</p>
  {/if}
</div>
