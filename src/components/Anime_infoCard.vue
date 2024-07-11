<script setup>
import { ref } from "vue"
import Cont_ainer from "./Cont_ainer.vue"
import axios from "axios"
import { useRoute } from "vue-router"

const route = useRoute()
const data = ref(null)
const imgCover = ref(null)
const imgCoverSmall = ref(null)

const fetchAnimeById = async (id) => {
  try {
    const animeId = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)
    data.value = animeId.data.data

    console.log(data.value)
    imgCover.value = data.value.images.jpg.large_image_url
    imgCoverSmall.value = data.value.images.jpg.image_url
  } catch (err) {
    console.log(err)
  }
}
fetchAnimeById(route.params.id)
</script>
<template>
  <nav>
    <div class="navimg" :style="{ backgroundImage: `url(${imgCover})` }"></div>
    <!--     <img class="wildImg" :src="data.images.jpg.large_image_url" alt="" /> -->
  </nav>
  <Cont_ainer>
    <div class="anime_card_nfo" v-if="data">
      <div class="headOfCard">
        <div class="otherInfo">
          <div class="h3PlusStory">
            <div class="text">
              <h3 class="title">{{ data.titles[0].title }}</h3>
              <p>
                {{ data.synopsis }}
              </p>
            </div>
          </div>
          <img :src="imgCoverSmall" alt="" />
        </div>
        <div class="more_info">
          <ul>
            <li>Overview</li>
            <li>Characters</li>
            <li>Staff</li>
            <li>Stats</li>
            <li>Social</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>loading ....</div>
  </Cont_ainer>
</template>
<style scoped>
.navimg {
  width: 100%;
  height: 360px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.h3PlusStory {
  display: flex;
  align-items: center;
}
.h3PlusStory .text {
  margin-left: 220px;
  margin-top: 20px;
  color: rgb(92, 114, 138);
}
.h3PlusStory .text h3 {
  font-size: 30px;
  font-weight: 500;
}
.otherInfo {
  position: relative;
}
.otherInfo img {
  height: 295px;
  width: 195px;
  position: absolute;
  top: -130px;
}
.more_info {
  display: flex;
  justify-content: flex-end;
}
.more_info ul {
  display: flex;
  gap: 69px;
  margin-right: 150px;
  margin-top: 30px;
  cursor: pointer;
}
</style>
