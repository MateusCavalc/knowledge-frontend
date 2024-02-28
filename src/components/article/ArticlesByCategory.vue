<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    <ul>
      <li :key="article.id" v-for="article in articles">
        <ArticleCard :article="article" />
      </li>
    </ul>
    <div class="load-more">
      <button
        v-if="loadMoreButton"
        class="btn btn-lg btn-outline-primary"
        @click="getArticles"
      >
        Carregar Mais
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import PageTitle from "../template/mfcPageTitle.vue";
import ArticleCard from "../article/ArticleCard.vue";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "ArticlesByCategory",
  components: { PageTitle, ArticleCard },
  data() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMoreButton: true,
    };
  },
  methods: {
    getCategory() {
      axios
        .get(`${baseApiUrl}/categories/${this.category.id}`)
        .then((resp) => {
          this.category = resp.data.data;
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível obter a categoria
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    getArticles() {
      axios
        .get(
          `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
        )
        .then((resp) => {
          this.articles = this.articles.concat(resp.data.data);
          this.page++;

          if (resp.data.data.length === 0) {
            this.loadMoreButton = false;
          }

          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível obter os artigos da categoria
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
  },
  watch: {
    $route(to) {
      this.category.id = to.params.id;
      this.articles = [];
      this.page = 1;
      this.loadMoreButton = true;

      this.getCategory();
      this.getArticles();
    },
  },
  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  },
};
</script>

<style>
.articles-by-category ul {
  list-style-type: none;
  padding: 0;
}

.load-more {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>