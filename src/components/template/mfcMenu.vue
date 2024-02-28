<template>
  <aside v-show="menuVisible" class="menu">
    <Tree
      :nodes="data"
      :gap="1"
      :indentSize="15"
      :rowHoverBackground="'#fff3'"
      @nodeClick="onNodeSelected"
    />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "vue3-tree";
import "vue3-tree/dist/style.css";
import { ref } from "vue";
import axios from "axios";

const baseApiUrl = process.env.VUE_APP_API_URL;

export default {
  name: "mfcMenu",
  components: { Tree },
  async setup() {
    let treeData = null;
    try {
      const resp = await axios.get(`${baseApiUrl}/categories/tree`);
      treeData = resp.data.data;
    } catch (err) {
      treeData = [];
    }

    const data = ref(treeData);

    return { data };
  },
  // mapState() para mapear atributos da store para o componente
  computed: mapState(["menuVisible"]),
  methods: {
    onNodeSelected(node) {
      this.$router.push({
        name: "articlesByCategory",
        params: {
          id: node.id,
        },
      });
    },
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #232526, #414345);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu .tree-row-item {
  text-align: center;
}

.menu li {
  color: #fff;
}

.menu span {
  margin-left: 20px;
}

.menu svg {
  transform: scale(1.5);
}
</style>