<script setup>
import { ref, onMounted, defineEmits, onUnmounted } from "vue"
const observer = ref(null)
const divEl = ref(null)
const emits = defineEmits(["intersect"])

onMounted(() => {
  observer.value = new IntersectionObserver(([entry]) => {
    console.log(entry)
    if (entry && entry.isIntersecting) {
      emits("intersect")
    }
  })
  observer.value.observe(divEl.value)
  console.log(divEl.value)
})
// Clean up observer on component unmount
onUnmounted(() => {
  observer.value.disconnect()
})
</script>
<template>
  <div class="observer" ref="divEl"></div>
</template>
<style scoped>
.observer {
  margin: 0 auto;
  height: 20px;
  width: 20px;
}
</style>
