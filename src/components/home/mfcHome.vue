<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Base de conhecimento" />
    <div class="stats">
      <Stat
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-folder"
        color="#d54d50"
      />
      <Stat
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        color="#3bc480"
      />
      <Stat
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user"
        color="#3282cd"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

import PageTitle from "../template/mfcPageTitle.vue";
import Stat from "./mfcStat.vue";

export default {
  name: "mfcHome",
  components: { PageTitle, Stat },
  data: function () {
    return {
      stat: {},
    };
  },
  methods: {
    getStats() {
      axios
        .get(`${process.env.VUE_APP_API_URL}/stats`)
        .then((resp) => (this.stat = resp.data.data))
        .catch((err) => err);
    },
  },
  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>