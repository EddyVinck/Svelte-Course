<script>
  import Modal from "./Modal.svelte";

  export let message = "Something went wrong";
</script>

<Modal title="An error occurred!" on:cancelmodal>
  <p>{message}</p>
</Modal>
