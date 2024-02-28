<template>
  <footer class="footer">
    <span>Copyright <strong>mfc</strong> © 2020-2024</span>
  </footer>
</template>

<script>
export default {
  name: "mfcFooter",
};
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10px;
}
</style>