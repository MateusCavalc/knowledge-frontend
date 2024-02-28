<template>
  <header class="header">
    <a v-if="!hideToggle" class="toggle" @click="toggleMenu">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    <mfcUserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import mfcUserDropdown from "./mfcUserDropdown.vue";

export default {
  name: "mfcHeader",
  components: { mfcUserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.menuVisible ? "fa-angle-right" : "fa-angle-down";
    },
  },
  methods: {
    toggleMenu() {
      // {$store} para acesso à store da aplicação
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #1e469a, #49a7c1);

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #fff;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title > a,
.title > a:hover {
  color: #fff;
  text-decoration: none;
}

.header > a {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.header > a:hover {
  background-color: #0003;
  color: #fff;
  text-decoration: none;
}
</style>