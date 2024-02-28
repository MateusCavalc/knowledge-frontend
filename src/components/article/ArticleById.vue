<template>
  <div class="article-by-id">
    <PageTitle
      icon="fa fa-file-o"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import PageTitle from "../template/mfcPageTitle.vue";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "ArticleById",
  components: { PageTitle },
  data() {
    return {
      article: {},
    };
  },
  mounted() {
    axios
      .get(`${baseApiUrl}/articles/${this.$route.params.id}`)
      .then((resp) => {
        this.article = resp.data.data;
        toast.success(
          `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
        );
      })
      .catch((err) =>
        toast.error(`
            Não foi possível obter o artigo
            < ${err.response ? err.response.data.msg : ""} >
          `)
      );
  },
};
</script>

<style>
.article-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
}

/* código são renderizados em elemento pre */
.article-content pre {
  max-width: 100%;
  background-color: #1e1e1e;
  color: #fff;
  padding: 8px;
  border-radius: 8px;
}

.article-content :last-child {
  margin-bottom: 0;
}
</style>