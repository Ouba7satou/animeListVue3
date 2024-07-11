<script setup>
import { ref, computed, onMounted, defineEmits, watchEffect, reactive, watch } from "vue"
import Cont_ainer from "./Cont_ainer.vue"
import Anime_FilterComponet from "./Anime_FilterComponet.vue"
import axios from "axios"
const seasonVisible = ref(false)
const formatVisible = ref(false)
const yearVisible = ref(false)
const genresVisible = ref(false)
const searchVisible = ref(false)
const formatValue = ref([])
const seasonValue = ref([])
const yearValue = ref([])
const genresValue = ref([])
const searchValue = ref([])
const formatName = "Format"
const yearName = "Year"
const seasonName = "Season"

const data = ref(null)
const orginData = ref(null)

const reactiveFilterData = reactive({
  page: 1,
  limit: 25,
  type: "",
  genres: [1],
  status: ""
})

const anime_format = ["TV", "Movie", "TV Special", "Special", "OVA", "ONA", "Music", "CM", "PV"]
const anime_year = ref([])
const yearDate = new Date().getFullYear() + 2
for (let i = 1940; i < yearDate; i++) {
  anime_year.value.push(i)
}
const anime_season = ["Winter", "Spring", "Summer", "Fall"]

const toggleSearch = () => {
  searchVisible.value = true
  if (searchVisible.value) {
    seasonVisible.value = false
    formatVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
  }
}
const toggleGenresDropdown = () => {
  genresVisible.value = true
  if (genresVisible.value) {
    seasonVisible.value = false
    formatVisible.value = false
    yearVisible.value = false
    searchVisible.value = false
  }
}
const toggleYearDropdown = () => {
  yearVisible.value = true
  if (yearVisible.value) {
    seasonVisible.value = false
    formatVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
  }
}
const toggleFormatDropdown = () => {
  formatVisible.value = true
  if (formatVisible.value) {
    seasonVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
  }
}
const toggleSeasonDropdown = () => {
  seasonVisible.value = true
  if (seasonVisible.value) {
    formatVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
  }
}
const closeSearchVisible = () => {
  searchVisible.value = false
}
const closeGenresVisible = () => {
  genresVisible.value = false
}
const closeYearVisible = () => {
  yearVisible.value = false
}
const closeSeasonVisible = () => {
  seasonVisible.value = false
}
const closeFormatVisible = () => {
  formatVisible.value = false
}

/* const toggleFilterFormat = (dataArray) => {
  const index = formatValue.value.indexOf(dataArray)
  if (index === -1) {
    formatValue.value = [dataArray]
  } else {
    formatValue.value.splice(index, 1)
  }

  if (formatValue.value.length === 0) {
    formatValue.value = []
  }
} */
const toggleSingleItem = (array, item) => {
  const currentIndex = array.indexOf(item)
  if (currentIndex === -1) {
    array.splice(0, array.length, item)
  } else {
    array.splice(currentIndex, 1)
  }
}
const toggleFilterFormat = (dataArray) => toggleSingleItem(formatValue.value, dataArray)
const toggleFilterSeason = (dataArray) => toggleSingleItem(seasonValue.value, dataArray)

const filterValueDisplay = (filterValue) => {
  return computed(() => {
    if (filterValue.value.length === 0) {
      return "Any"
    } else if (filterValue.value.length === 1) {
      return `${filterValue.value[0]} `
    } else {
      return ` ${filterValue.value[0]} +${filterValue.value.length - 1}`.split("+")
    }
  })
}
const isItemSelected = (dataArray, valueF) => {
  return valueF.includes(dataArray)
}

const formatFilterValueDisplay = filterValueDisplay(formatValue)
const seasonFilterValueDisplay = filterValueDisplay(seasonValue)

//////////////////////////////////////////Fetch Api

const paramsSerializer = (params) => {
  return Object.keys(params)
    .map((key) => {
      if (Array.isArray(params[key])) {
        return `${key}=${params[key].join(",")}`
      }
      return `${key}=${params[key]}`
    })
    .join("&")
}
const fetchData = async () => {
  try {
    if (reactiveFilterData.year) {
      reactiveFilterData.year = reactiveFilterData.year + "-01-01"
    }
    const Api = await axios.get("https://api.jikan.moe/v4/anime", {
      params: reactiveFilterData,
      paramsSerializer: paramsSerializer
    })

    console.log(
      "Request URL:",
      `https://api.jikan.moe/v4/anime?${new URLSearchParams(reactiveFilterData).toString()}`
    )

    /*   const resp = await Api.json() */
    data.value = Api.data.data
    orginData.value = Api.data.data
  } catch (error) {
    console.log("error")
  }
}
fetchData()
const emits = defineEmits(["data_Sent"])

onMounted(() => emits("data_Sent", data))

watchEffect(() => {
  if (searchValue.value && typeof searchValue.value === "string") {
    data.value = orginData.value.filter(
      (an) =>
        (an.title && an.title.toLowerCase().includes(searchValue.value.toLowerCase())) ||
        (an.title_english &&
          an.title_english.toLowerCase().includes(searchValue.value.toLowerCase()))
    )
  } else {
    data.value = orginData.value
  }

  if (formatValue.value.length !== 0) {
    reactiveFilterData.type = formatValue.value[0]?.toLowerCase().split(" ").join("_") || ""
    fetchData()
  } else {
    // Reset to original data if no format filter is selected
    fetchData()
    reactiveFilterData.type = "" // Optionally reset the type filter as well
  }
})

/* watch(
  [formatValue, seasonValue],
  ([newFormatValue, newSeasonValue]) => {
    if (newFormatValue.length !== 0) {
      reactiveFilterData.type = newFormatValue[0]?.toLowerCase().split(" ").join("_") || ""
    } else {
      reactiveFilterData.type = "" // Reset the type filter
    }

    fetchData() // Fetch data whenever formatValue or seasonValue changes
  },
  { immediate: true }
      if (searchValue.value && typeof searchValue.value === "string") {
    data.value = orginData.value.filter(
      (an) =>
        (an.title && an.title.toLowerCase().includes(searchValue.value.toLowerCase())) ||
        (an.title_english &&
          an.title_english.toLowerCase().includes(searchValue.value.toLowerCase()))
    )
  } else {
    data.value = orginData.value
  }
  if (formatValue.value.length !== 0) {
    reactiveFilterData.type = formatValue.value[0]?.toLowerCase().split(" ").join("_") || ""
  } else {
    reactiveFilterData.type = "" // Reset the type filter
  }

  fetchData() // Fetch data whenever formatValue or seasonValue changes  
) */
</script>

<template>
  <Cont_ainer>
    {{ searchValue }}
    <div class="filter_container">
      <!-- Start Anime Search -->
      <div class="search">
        <span class="span_lable">Search</span>
        <div class="filter_a" @click="toggleSearch" v-click-outside="closeSearchVisible">
          <img src="./icons/search.svg" alt="" @click.stop="toggleSearch" /><input
            type="text"
            @click.stop="toggleSearch"
            v-model.trim="searchValue"
          />
        </div>
      </div>
      <!-- Start Anime Search-->

      <!-- Start Anime Genres -->
      <div class="genres">
        <span class="span_lable">Genres</span>
        <div class="filter_a" @click="toggleGenresDropdown" v-click-outside="closeGenresVisible">
          <span @click.stop="toggleGenresDropdown">Any</span
          ><img src="./icons/dropDown.svg" alt="dropDown" @click.stop="toggleGenresDropdown" />
          <div class="drop_Down-menu" v-if="genresVisible">
            <ul>
              <li v-for="years in anime_year" :key="years">{{ years }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Start Anime Genres -->

      <!-- Start Anime Year -->
      <div class="year">
        <span class="span_lable">Year</span>
        <div class="filter_a" @click="toggleYearDropdown" v-click-outside="closeYearVisible">
          <span @click.stop="toggleYearDropdown">Any</span
          ><img src="./icons/dropDown.svg" alt="dropDown" @click.stop="toggleYearDropdown" />
          <div class="drop_Down-menu" v-if="yearVisible">
            <ul>
              <li v-for="year in anime_year" :key="year">{{ year }}</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- End Anime Year -->

      <!-- Start Anime Season -->
      <div class="season">
        <Anime_FilterComponet
          :divFilterName="'Season'"
          :toggleDropDown="toggleSeasonDropdown"
          :valueFilter="seasonValue"
          :filterValueDisplay="seasonFilterValueDisplay"
          :visible="seasonVisible"
          :loopDataArray="anime_season"
          :closeDropdown="closeSeasonVisible"
          :toggleSelection="toggleFilterSeason"
          :filterValueToggle="seasonValue"
          :isItemSelected="isItemSelected"
        />
      </div>

      <!-- End Anime Season -->

      <!-- Start Anime Format -->
      <div class="format">
        <Anime_FilterComponet
          :divFilterName="'Format'"
          :toggleDropDown="toggleFormatDropdown"
          :valueFilter="formatValue"
          :filterValueDisplay="formatFilterValueDisplay"
          :visible="formatVisible"
          :loopDataArray="anime_format"
          :closeDropdown="closeFormatVisible"
          :toggleSelection="toggleFilterFormat"
          :isItemSelected="isItemSelected"
        />
        <!--  :filterValueToggle="formatValue" -->
      </div>
      <!-- End Anime Format -->
    </div>
  </Cont_ainer>
</template>

<style>
.filter_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 9999999;
}
.filter_a {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 33px;
  border-radius: 4px;
  box-shadow:
    0 10px 20px #6784bb40,
    0 4px 4px #6784bb40;
  padding: 5px 13px;
  color: #647380;
  cursor: pointer;
}
.filter_a input {
  width: 100%;
  height: 100%;
  border: none;
}
.filter_a input:focus {
  outline: none;
}
.filter_container img {
  width: 15px;
  margin-right: 5px;
}

.filter_container span {
  font-size: 13px;
  font-weight: 500;
  color: #64738094;
}
.filter_container .span_lable {
  color: #647380;
  font-weight: 500;
  font-size: 14px;
  margin: 0px 0px 12px 7px;
  display: block;
}
.drop_Down-menu {
  position: absolute;
  top: 40px;
  left: 0;
  width: 180px;
  border-radius: 4px;
  box-shadow:
    0 10px 20px #6784bb40,
    0 4px 4px #6784bb40;
  color: #647380;
  cursor: pointer;
  background-color: white;
}
.drop_Down-menu ul li {
  padding: 5px 13px;
  font-weight: 500;
  color: #647380;
  font-size: 13px;
}
.filter_a .span_select {
  padding: 1px 5px;
  background-color: #dde6ee;
  font-weight: 500;
  border-radius: 4px;
  display: inline-block;
}
.filter_a span .span_select:first-child {
  margin-right: 3px;
}
</style>
