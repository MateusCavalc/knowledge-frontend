<template>
  <div class="admin-pages">
    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="Cadastros & Cia"
    />
    <div class="admin-pages-tabs">
      <!-- obs: componentes b-... são do vue-bootstrap -->
      <b-card no-body>
        <b-tabs card>
          <b-tab lazy title="Artigos" active>
            <ArticleAdmin />
          </b-tab>
          <b-tab lazy title="Categorias">
            <CategoryAdmin />
          </b-tab>
          <b-tab lazy title="Usuários">
            <UserAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/mfcPageTitle.vue";
import ArticleAdmin from "./ArticleAdmin.vue";
import CategoryAdmin from "./CategoryAdmin.vue";
import UserAdmin from "./UserAdmin.vue";

export default {
  name: "AdminPages",
  components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin },
};
</script>

<style>
</style>