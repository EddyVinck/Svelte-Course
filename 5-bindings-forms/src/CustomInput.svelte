<script>
  export let value;
</script>

<!-- 'type' attribute cannot be dynamic if input uses two-way binding -->
<input type="text" bind:value />
