<script>
  export let pw = "";
  export let pwTooShort = false;
  export let pwTooLong = false;
  export let savedPasswords = [];
  $: validPassword =
    pwTooLong === false && pwTooShort === false && pw.length > 0;

  function handlePasswordChange() {
    // console.log(pw);
    if (pw.length === 0) {
      pwTooLong = false;
      pwTooShort = false;
    } else {
      const minimumPasswordLength = 5;
      const maximumPasswordLength = 10;

      pwTooLong = pw.length > maximumPasswordLength;
      pwTooShort = pw.length < minimumPasswordLength;
    }
  }
  function handleSavePassword() {
    if (validPassword) {
      savedPasswords = [{ id: Math.random(), password: pw }, ...savedPasswords];
      pw = "";
    }
  }
  function deletePassword(index) {
    // savedPasswords.splice(index, 1);
    // savedPasswords = savedPasswords; // force Svelte change detection
    savedPasswords = savedPasswords.filter((item, i) => i !== index);
  }
</script>

<input type="password" bind:value={pw} on:input={handlePasswordChange} />
{#if pwTooShort}
  <p>Password too short!</p>
{:else if pwTooLong}
  <p>Password too long!</p>
{:else if validPassword}
  <p>Your password: {pw}</p>
  <button on:click={handleSavePassword}>Save password</button>
{/if}

<h2>Your passwords</h2>
<ul>
  {#each savedPasswords as password, index (password.id)}
    <li>
      <button on:click={() => deletePassword(index)}>
         {password.password}
      </button>
    </li>
  {/each}
</ul>

<h1>Assignment</h1>

<p>Solve these tasks.</p>

<ol>
  <li>Add a password input field and save the user input in a variable.</li>
  <li>
    Output "Too short" if the password is shorter than 5 characters and "Too
    long" if it's longer than 10.
  </li>
  <li>
    Output the password in a paragraph tag if it's between these boundaries.
  </li>
  <li>Add a button and let the user add the passwords to an array.</li>
  <li>Output the array values (= passwords) in a unordered list (ul tag).</li>
  <li>Bonus: If a password is clicked, remove it from the list.</li>
</ol>
