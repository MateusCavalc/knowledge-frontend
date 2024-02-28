<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/imgs/logo.png" width="200" alt="logo" />
      <hr />
      <div class="auth-title">{{ showSignUp ? "Cadastro" : "Login" }}</div>

      <input
        v-if="showSignUp"
        v-model="user.name"
        placeholder="Nome"
        type="text"
      />
      <input v-model="user.email" placeholder="E-mail" type="text" />
      <input v-model="user.password" placeholder="Senha" type="password" />
      <input
        v-if="showSignUp"
        v-model="user.passwordConfirm"
        placeholder="Confirme a senha"
        type="password"
      />

      <button v-if="showSignUp" @click="signUp">Registrar</button>
      <button v-else @click="signIn">Entrar</button>

      <a href @click.prevent="showSignUp = !showSignUp">
        <span v-if="showSignUp">Já possui cadastro?</span>
        <span v-else>Não possui cadastro?</span>
      </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;
const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
  name: "UserAuth",
  data() {
    return {
      showSignUp: false,
      user: {},
    };
  },
  methods: {
    signIn() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((resp) => {
          const user = {
            ...resp.data.data.payload,
            token: resp.data.data.token,
          };
          // chama a funcao da store para setar o usuario da sessao
          this.$store.commit("setUser", user);
          // salvar o usuario no localStorage para guardar a sessao no browser
          localStorage.setItem(userKey, JSON.stringify(user));
          toast.success("Login efetuado com sucesso");

          this.$router.push({ path: "/" });
        })
        .catch((err) =>
          toast.error(
            `${
              err.response
                ? err.response.data.msg
                : "Não foi possível realizar o login, tente novamente."
            }`
          )
        );
    },
    signUp() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then((resp) => {
          toast.success(
            `${
              resp.data.msg.length
                ? resp.data.msg
                : "Usuário criado com sucesso"
            }`
          );
          this.user = {};
          this.showSignUp = false;
        })
        .catch((err) =>
          toast.error(
            `${
              err.response
                ? err.response.data.msg
                : "Não foi possível criar o usuário, tente novamente"
            }`
          )
        );
    },
  },
  mounted() {
    const anyUser = JSON.parse(localStorage.getItem(userKey));
    if (anyUser) {
      this.$store.commit("setUser", anyUser);
      this.$router.push({ path: "/" });
      return;
    }
  },
};
</script>

<style>
.auth-content {
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-content: center;
}

.auth-modal {
  border-radius: 8px;
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  border: 1px solid #bbb;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 3px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0.4),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0.4)
  );
}
</style>