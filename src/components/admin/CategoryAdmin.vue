<template>
  <div class="category-admin">
    <b-form>
      <input id="category-id" type="hidden" v-model="category.id" />
      <b-form-group label="Nome:" label-for="category-name">
        <b-form-input
          id="category-name"
          type="text"
          v-model="category.name"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o nome da categoria"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Categoria Pai:" label-for="category-parentId">
        <b-form-select
          v-if="mode === 'save'"
          id="category-parentId"
          :options="[
            {
              value: '',
              text: 'Selecione uma categoria pai',
              disabled: true,
            },
            ...categories,
          ]"
          v-model="category.parentId"
        ></b-form-select>
        <b-form-input
          v-else
          id="category-parentId"
          type="text"
          v-model="category.path"
          readonly
        ></b-form-input>
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
    <b-table hover striped :items="categories" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadCategory(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadCategory(data.item, 'remove')"
          class="mx-2"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "CategoryAdmin",
  data() {
    return {
      mode: "save",
      category: {},
      categories: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "path", label: "Caminho", sortable: true },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadCategories() {
      axios
        .get(`${baseApiUrl}/categories`)
        .then((resp) => {
          this.categories = resp.data.data.map((category) => {
            return { ...category, value: category.id, text: category.path };
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
    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
    save() {
      const method = this.category.id ? "put" : "post";
      const urlId = this.category.id ? `/${this.category.id}` : "";

      axios[method](`${baseApiUrl}/categories${urlId}`, this.category)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível criar a categoria
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    remove() {
      const id = this.category.id;

      axios
        .delete(`${baseApiUrl}/categories/${id}`)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível remover a categoria
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = {
        id: category.id,
        name: category.name,
        path: category.path,
        parentId: category.parentId,
      };
    },
  },
  mounted() {
    this.loadCategories();
  },
};
</script>

<style>
</style>