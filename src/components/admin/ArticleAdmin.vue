<template>
  <div class="article-admin">
    <b-form>
      <input id="article-id" type="hidden" v-model="article.id" />
      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input
          id="article-name"
          type="text"
          v-model="article.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o nome do artigo"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Descrição:" label-for="article-description">
        <b-form-input
          id="article-description"
          type="text"
          v-model="article.description"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a descrição do artigo"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Imagem (URL):"
        label-for="article-imageUrl"
      >
        <b-form-input
          id="article-imageUrl"
          type="text"
          v-model="article.imageUrl"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a URL da imagem"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Categoria:"
        label-for="article-categoryId"
      >
        <b-form-select
          id="article-categoryId"
          :options="[
            {
              value: '',
              text: 'Selecione uma categoria',
              disabled: true,
            },
            ...categories,
          ]"
          v-model="article.categoryId"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Autor:"
        label-for="article-userId"
      >
        <b-form-select
          id="article-userId"
          :options="[
            {
              value: '',
              text: 'Selecione um autor',
              disabled: true,
            },
            ...users,
          ]"
          v-model="article.userId"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        v-if="mode === 'save'"
        label="Conteúdo:"
        label-for="article-content"
      >
        <VueEditor
          v-model="article.content"
          placeholder="Informe o conteúdo do artigo"
        />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">
        Salvar
      </b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
        Excluir
      </b-button>
      <b-button class="mx-2" @click="reset"> Cancelar </b-button>
    </b-form>
    <hr />
    <b-table hover striped :items="articles" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadArticle(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadArticle(data.item, 'remove')"
          class="mx-2"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="perPage"
    ></b-pagination>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { VueEditor } from "vue3-editor";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "ArticleAdmin",
  components: { VueEditor },
  data() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      perPage: 0,
      count: 0,
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "description", label: "Descrição", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadArticles() {
      axios
        .get(`${baseApiUrl}/articles?page=${this.page}`)
        .then((resp) => {
          this.articles = resp.data.data.articles;
          this.page = parseInt(resp.data.data.page);
          this.perPage = parseInt(resp.data.data.perPage);
          this.count = parseInt(resp.data.data.total);
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível buscar or artigos
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    loadCategories() {
      axios
        .get(`${baseApiUrl}/categories`)
        .then((resp) => {
          this.categories = resp.data.data.map((category) => {
            return { value: category.id, text: category.path };
          });
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível buscar as categorias
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    loadUsers() {
      axios
        .get(`${baseApiUrl}/users`)
        .then((resp) => {
          this.users = resp.data.data.map((user) => {
            return { value: user.id, text: `${user.name} - ${user.email}` };
          });
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível buscar os usuários
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    reset() {
      this.mode = "save";
      this.article = {};
      this.articles = [];
      this.categories = [];
      this.users = [];
      this.loadArticles();
      this.loadCategories();
      this.loadUsers();
    },
    save() {
      const method = this.article.id ? "put" : "post";
      const urlId = this.article.id ? `/${this.article.id}` : "";

      axios[method](`${baseApiUrl}/articles${urlId}`, this.article)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível criar o artigo
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    remove() {
      const id = this.article.id;

      axios
        .delete(`${baseApiUrl}/articles/${id}`)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível remover o artigo
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    loadArticle(article, mode = "save") {
      this.mode = mode;

      axios
        .get(`${baseApiUrl}/articles/${article.id}`)
        .then((resp) => {
          this.article = resp.data.data;
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          // this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível buscar o conteúdo artigo
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
  },
  watch: {
    page() {
      this.loadArticles();
    },
  },
  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style>
</style>