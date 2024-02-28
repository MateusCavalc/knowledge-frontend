<template>
  <div class="user-admin">
    <b-form>
      <input id="user-id" type="hidden" v-model="user.id" />
      <b-row class="mb-2">
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome do usuário"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o e-mail do usuário"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        v-show="mode === 'save'"
      >
        Administrador
      </b-form-checkbox>
      <b-row v-show="mode === 'save'" class="mt-3">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              placeholder="Informe a senha do usuário"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group
            label="Confirmação de senha:"
            label-for="user-passwordConfirm"
          >
            <b-form-input
              id="user-passwordConfirm"
              type="password"
              v-model="user.passwordConfirm"
              required
              placeholder="Confirme a senha do usuário"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col xs="12">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">
            Salvar
          </b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
            Excluir
          </b-button>
          <b-button class="mx-2" @click="reset"> Cancelar </b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <b-table hover striped :items="users" :fields="fields">
      <template #cell(actions)="data">
        <b-button variant="warning" @click="loadUser(data.item)">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadUser(data.item, 'remove')"
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
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      user: {},
      users: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        { key: "actions", label: "Ações" },
      ],
    };
  },
  methods: {
    loadUsers() {
      axios
        .get(`${baseApiUrl}/users`)
        .then((resp) => {
          this.users = resp.data.data;
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
        })
        .catch((err) =>
          toast.error(`
            Não foi possível criar o usuário
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    reset() {
      this.mode = "save";
      this.user = {};
      // this.loadUsers();
    },
    save() {
      const method = this.user.id ? "put" : "post";
      const urlId = this.user.id ? `/${this.user.id}` : "";

      axios[method](`${baseApiUrl}/users${urlId}`, this.user)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível criar o usuário
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    remove() {
      const id = this.user.id;

      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then((resp) => {
          toast.success(
            `${resp.data.msg.length ? resp.data.msg : resp.data.status}`
          );
          this.reset();
        })
        .catch((err) =>
          toast.error(`
            Não foi possível criar o usuário
            < ${err.response ? err.response.data.msg : ""} >
          `)
        );
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
  },
  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>