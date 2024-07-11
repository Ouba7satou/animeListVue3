<script setup>
import Anime_Filter from "../components/Anime_Filter.vue"

import Cont_ainer from "../components/Cont_ainer.vue"
/*
import { ref } from "vue"
import Anime_listBrowse from "../components/Anime_listBrowse.vue"
 const childrenData = ref(null)
const handleDataFromChild = (data) => {
  console.log(data, "data")
  childrenData.value = data
  console.log(childrenData)
} 
 */
</script>
<template>
  <Cont_ainer>
    <Suspense>
      <Anime_Filter />
    </Suspense>
  </Cont_ainer>
</template>
