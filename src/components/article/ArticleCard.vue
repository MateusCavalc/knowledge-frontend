<template>
  <div class="article-card">
    <router-link :to="{ name: 'articleById', params: { id: article.id } }">
      <div class="article-card-image d-none d-sm-block">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          height="150"
          width="150"
          alt="article"
        />
        <img
          v-else
          src="@/assets/imgs/default-article.png"
          height="150"
          width="150"
          alt="article"
        />
      </div>
      <div class="article-card-info">
        <h2>{{ article.name }}</h2>
        <p>{{ article.description }}</p>

        <span class="article-card-author">
          <strong>Autor: </strong>{{ article.author }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleCard",
  props: ["article"],
};
</script>

<style>
.article-card {
  border: 1px solid #0003;
  border-radius: 8px;
  box-shadow: 0 1px 5px #0003;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
}

.article-card a {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  color: #000;
}

.article-card-info h2 {
  font-size: 1.7rem;
}

.article-card-image {
  padding-right: 20px;
  border-right: 1px solid #000;
  margin-right: 20px;
}

.article-card-info {
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.article-card-info p {
  flex: 1;
  color: #555;
  font-size: 1.1rem;
}
</style>