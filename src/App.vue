<template>
  <div id="page" :class="{ 'hide-menu': !menuVisible || !user }">
    <mfcHeader
      title="MFC - Base de Conhecimento"
      :hideToggle="!user"
      :hideUserDropdown="!user"
    />
    <Suspense>
      <mfcMenu v-if="user" />
    </Suspense>
    <Loading v-if="validatingToken" />
    <mfcContent v-else />
    <mfcFooter />
  </div>
</template>

<script>
import { mapState } from "vuex";
import mfcHeader from "./components/template/mfcHeader.vue";
import mfcMenu from "./components/template/mfcMenu.vue";
import mfcContent from "./components/template/mfcContent.vue";
import mfcFooter from "./components/template/mfcFooter.vue";
import Loading from "./components/template/LoadingValidation.vue";

import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const baseApiUrl = process.env.VUE_APP_API_URL;
const userKey = process.env.VUE_APP_USER_LOCAL_STORAGE;

export default {
  name: "App",
  components: { mfcContent, mfcFooter, mfcHeader, mfcMenu, Loading },
  computed: mapState(["menuVisible", "user"]),
  data() {
    return {
      validatingToken: false,
    };
  },
  methods: {
    async validateToken(token) {
      let validToken = false;

      try {
        const resp = await axios.post(`${baseApiUrl}/token/validate`, {
          token,
        });

        validToken = resp.data.data.auth;
      } catch (err) {
        toast.error(
          `${
            err.response.data.msg ??
            "Não foi possível validar o token, tente novamente."
          }`
        );
      }
      return validToken;
    },
  },
  async created() {
    const anyUser = JSON.parse(localStorage.getItem(userKey));

    if (!anyUser) {
      this.$router.push({ path: "auth" });
      return;
    }

    this.validatingToken = true;

    if (await this.validateToken(anyUser.token)) {
      this.$store.commit("setUser", anyUser);
    } else {
      localStorage.removeItem(userKey);
      this.$router.push({ path: "auth" });
    }

    this.validatingToken = false;
  },
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  height: 100vh;
}

#page {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#page.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
