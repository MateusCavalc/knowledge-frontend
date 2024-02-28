<template>
  <div class="page-title">
    <h1>
      <i v-if="icon" :class="icon"></i> <span>{{ main }}</span>
    </h1>
    <h2>{{ sub }}</h2>
    <hr />
  </div>
</template>

<script>
export default {
  name: "mfcpageTitle",
  props: {
    icon: String,
    main: String,
    sub: String,
  },
};
</script>

<style>
.page-title {
  vertical-align: text-bottom;
}

.page-title h1 {
  margin: 0;
}
.page-title h2 {
  color: #777;
  margin-top: 5px;
  font-size: 1.3rem;
}
</style>