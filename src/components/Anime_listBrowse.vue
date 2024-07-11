<script setup>
import { ref } from "vue"

import Anime_Card from "./List_Card.vue"
import Ob_server from "./Ob_server.vue"
const props = defineProps(["childrenData", "routeClick"])
</script>
<template>
  <h3>Anime List</h3>

  <Anime_Card :childrenData="childrenData" />
  <Ob_server @intersect="loadData" />
</template>
