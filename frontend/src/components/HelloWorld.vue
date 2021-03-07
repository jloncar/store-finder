<template>
  <div class="hello">
    <h1>Store Finder</h1>
    <p>
      This project is a frontend for consuming GraphQL Store API.<br />
      To query API directly, please use
      <a :href="url" target="_blank" rel="noopener">GrapiQL on backend</a>.
    </p>
  </div>
</template>

<script lang="ts">
declare let process: any;
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  url = process.env.VUE_APP_BACKEND_ENDPOINT;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
