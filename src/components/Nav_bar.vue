<script setup>
import { ref } from "vue"
import { RouterLink } from "vue-router"
import Cont_ainer from "./Cont_ainer.vue"

const userName = ref(10)
const visible = ref(false)
const showSearhModle = () => (visible.value = true)
const closeSearhModle = () => {
  visible.value = false
  search.value = ""
}
const notification = ref(10)
const search = ref("")
console.log(search)
</script>
<template>
  <header>
    <Cont_ainer>
      <div class="nav_container">
        <div class="nav_icon">
          <RouterLink to="/">
            <img alt="Anime List" class="logo" src="./icons/icon.svg" width="125" height="125"
          /></RouterLink>
        </div>

        <nav>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink :to="`/user/${userName}/animelist`">Anime List</RouterLink></li>
            <li><RouterLink :to="`/user/${userName}/mangalist`">Manga List</RouterLink></li>
            <li class="browse">
              Browse
              <div class="browse_A_M">
                <div class="anime">
                  <img src="./icons/play.svg" alt="" class="profile_icon" />
                  <RouterLink :to="`/search/anime`">Anime</RouterLink>
                </div>
                <div class="manga">
                  <img src="./icons/book.svg" alt="" class="profile_icon" />
                  <RouterLink :to="`/search/manga`">Manga</RouterLink>
                </div>
              </div>
            </li>
            <li><RouterLink to="/about">About</RouterLink></li>
          </ul>
        </nav>
        <div class="search_profile_notification">
          <div class="search" @click="showSearhModle">
            <img src="./icons/search.svg" alt="" />
            <div class="overlay_input" v-if="visible" @click.stop @click="closeSearhModle">
              >
              <div class="input_search" @click.stop>
                <img src="./icons/search.svg" alt="" />
                <input type="text" placeholder="Search Anime List" v-model.trim="search" />
                <div class="close" @click="closeSearhModle">X</div>
              </div>
            </div>
          </div>
          <div class="profile">
            <RouterLink :to="`/user/${userName}`" class="profile_link"
              ><img src="./icons/default.png" alt="" class="profile_icon"
            /></RouterLink>
          </div>
          <div class="notification">
            {{ notification }}
          </div>
        </div>
      </div>
    </Cont_ainer>
  </header>
</template>
<style scoped>
.logo {
  width: 70px;
}
nav ul li.browse,
nav ul li a {
  padding: 18px 16px;
  color: #d3d5f3;
  font-size: 13px;
}
header {
  background-color: #24263e;
  height: 65px;
}
.nav_container,
header,
nav ul,
.search_profile_notification {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search_profile_notification {
  gap: 6px;
}
.profile_link {
  padding: 5px;
}
.search img {
  width: 15px;
  cursor: pointer;
}
.profile_icon {
  width: 40px;
}
.notification {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  width: 22px;
  height: 22px;
  background-color: #e91e63;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  margin: 0;
  line-height: 6px;
  text-align: center;
}
.overlay_input {
  background: #4545459c;
  height: 100vh;
  left: 0;
  position: absolute;
  width: 100vw;
  z-index: 3000;
  top: 0vh;
  opacity: 0.5;
}
.input_search {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 140px;
  left: calc(50% - 330px);
  width: 670px;
  height: 45px;
}
.input_search input {
  width: 90%;
  height: 100%;
  border: none;
}
.input_search input:focus {
  outline: none;
}
.close {
  display: flex;
  background-color: white;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-right: 10px;
  border-radius: 0 6px 6px 0;
  font-size: 13px;
  cursor: pointer;
}
.input_search img {
  width: 20px;
  background: white;
  height: 100%;
  padding-left: 5px;
  border-radius: 6px 0 0px 6px;
}
.browse {
  position: relative;
  transition: 0.5s ease;
  cursor: pointer;
}
.browse_A_M {
  position: absolute;
  opacity: 0;
  width: 235px;
  height: 130px;
  background-color: white;
  box-shadow:
    0 10px 20px #6784bb40,
    0 4px 4px #6784bb40;
  border-radius: 3px;
  padding: 15px;
  top: 30px;
  left: -2px;
  z-index: -1;

  transition: 0.3s ease;
}
.browse_A_M::after {
  width: 0;
  height: 0;
  content: "";
  z-index: -1;
  border-bottom: 9px solid white;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  bottom: 100%;
  left: 15%;
  position: absolute;
  top: -8px;
}
li.browse:hover .browse_A_M {
  opacity: 1;
  top: 50px;
  z-index: 999999999;
}
.browse_A_M .anime,
.browse_A_M .manga {
  display: flex;
  align-items: center;
  gap: 2px;
}
.browse_A_M .anime a,
.browse_A_M .manga a {
  color: #647380;
  padding: 7px 10px;
}
.browse_A_M .anime img,
.browse_A_M .manga img {
  width: 12px;
}
</style>
