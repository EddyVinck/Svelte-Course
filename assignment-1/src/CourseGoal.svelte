<script>
  export let courseGoal = "";
</script>

<style>
  .burning-passion {
    color: red;
    font-weight: bold;
  }
</style>

<h1 class:burning-passion={courseGoal.includes('!')}>{courseGoal}</h1>
