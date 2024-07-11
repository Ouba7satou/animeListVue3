<script setup>
import Cont_ainer from "./Cont_ainer.vue"
import { useRouter } from "vue-router"
const props = defineProps(["childrenData"])
const router = useRouter()

const addAnimeLink = (mal_id, title_english, romanjiTitle) => {
  router.push(
    `/anime/${mal_id}/${title_english ? title_english.split(" ").join("_") : romanjiTitle.split(" ").join("_")}`
  )
}
</script>
<template>
  <Cont_ainer v-if="childrenData" class="container">
    <div
      class="anime_card"
      v-for="anime in childrenData"
      :key="anime.mal_id === anime.mal_id ? '' : anime.mal_id"
      @click="addAnimeLink(anime.mal_id, anime.title_english, anime.title)"
    >
      <img :src="anime.images.jpg.image_url" alt="" ref="img_name" />
      <div class="title">
        {{ anime.title }}
      </div>

      <div class="info">
        <div class="season_rating">
          <span class="season"
            >{{ anime.season === null ? "Unknown" : anime.season }}
            {{ anime.year === null ? "Unknown" : anime.year }}</span
          >
          <span class="rating">{{ anime.score }}</span>
        </div>
        <div class="studio">
          <span v-for="studio in anime.studios" :key="studio">{{ studio.name }}</span>
        </div>
        <div class="type_episode">
          <span class="type">{{ anime.type === "TV" ? `${anime.type} Show` : anime.type }}</span>
          <span class="episode"
            >{{ anime.episodes === null ? "Unknown" : anime.episodes }} Episodes</span
          >
        </div>
        <div class="genres">
          <span v-for="genre in anime.genres.slice(0, 3)" :key="genre">{{ genre.name }} </span>
        </div>
      </div>
    </div>
  </Cont_ainer>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
  margin-top: 30px;
}
.anime_card {
  width: 170px;
  height: 300px;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
}
.anime_card .title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
img {
  width: 100%;
  height: 250px;
  border-radius: inherit;
}
.info {
  opacity: 0;
  position: absolute;
  width: 250px;
  height: 150px;
  background: white;
  z-index: 9999;
  top: 50px;
  right: -40%;
  border-radius: inherit;
  transition: 0.4s ease;
  padding: 10px;
  text-transform: capitalize;
  box-shadow:
    0 10px 20px #6784bb40,
    0 4px 4px #6784bb40;
}
.anime_card:hover .info {
  opacity: 1;
}
.info .season_rating,
.info .studio,
.info .type_episode,
.info .genres {
  display: flex;
  gap: 10px;
}
.info .season_rating {
  justify-content: space-between;
}
</style>
