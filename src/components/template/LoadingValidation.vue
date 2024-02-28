<template>
  <div class="loading">
    <img src="@/assets/loading.gif" width="200px" alt="loading" />
  </div>
</template>

<script>
export default {
  name: "LoadingValidation",
};
</script>

<style>
.loading {
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>