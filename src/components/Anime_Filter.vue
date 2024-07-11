<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue"
import Cont_ainer from "./Cont_ainer.vue"
import Anime_FilterComponet from "./Anime_FilterComponet.vue"
import Anime_Card from "./List_Card.vue"
import Ob_server from "./Ob_server.vue"
import axios from "axios"

const statusVisible = ref(false)
const formatVisible = ref(false)
const yearVisible = ref(false)
const genresVisible = ref(false)
const searchVisible = ref(false)
const orderByVisible = ref(false)
const data = ref(null)

const yearValue = ref("")
const genreValue = ref([])
const anime_genre = ref([])
const reactiveFilterData = reactive({
  page: 1,
  limit: 25,
  type: "",
  genres: [],
  status: "",
  q: "",
  start_date: "",
  end_date: "",
  order_by: "",
  sort: "desc"
})

const anime_format = ["TV", "Movie", "TV Special", "Special", "OVA", "ONA", "Music", "CM", "PV"]
const anime_orderBy = [
  "Title",
  "Episodes",
  "Score",
  "Scored_by",
  "Rank",
  "Popularity",
  "Members",
  "Favorites",
  "Start_date",
  "End_date",
  "mal_id"
]
const anime_year = ref([])
const yearDate = new Date().getFullYear() + 2
for (let i = 1970; i <= yearDate; i++) {
  anime_year.value.push(i)
}
const anime_status = ["Airing", "Complete", "Upcoming"]

const toggleSearch = () => {
  searchVisible.value = true
  if (searchVisible.value) {
    statusVisible.value = false
    formatVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    orderByVisible.value = false
  }
}
const toggleGenresDropdown = () => {
  genresVisible.value = true
  if (genresVisible.value) {
    statusVisible.value = false
    formatVisible.value = false
    yearVisible.value = false
    searchVisible.value = false
    orderByVisible.value = false
  }
}
const toggleYearDropdown = () => {
  yearVisible.value = true
  if (yearVisible.value) {
    statusVisible.value = false
    formatVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
  }
}
const toggleFormatDropdown = () => {
  formatVisible.value = true
  if (formatVisible.value) {
    statusVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
    orderByVisible.value = false
  }
}
const togglestatusDropdown = () => {
  statusVisible.value = true
  if (statusVisible.value) {
    formatVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
    orderByVisible.value = false
  }
}
const toggleOrderByDropdown = () => {
  orderByVisible.value = true
  if (orderByVisible.value) {
    formatVisible.value = false
    yearVisible.value = false
    genresVisible.value = false
    searchVisible.value = false
    statusVisible.value = false
  }
}
const closeSearchVisible = () => (searchVisible.value = false)

const closeGenresVisible = () => (genresVisible.value = false)

const closeYearVisible = () => (yearVisible.value = false)

const closestatusVisible = () => (statusVisible.value = false)

const closeFormatVisible = () => (formatVisible.value = false)

const closeOrderByVisible = () => (orderByVisible.value = false)

const toggleFilterFormat = (dataArray, divName) => {
  reactiveFilterData.page = 1

  if (divName === "Format") {
    if (reactiveFilterData.type == dataArray) {
      reactiveFilterData.type = ""
    } else reactiveFilterData.type = dataArray.split(" ").join("_")
  }
  if (divName === "Status") {
    if (reactiveFilterData.status == dataArray) {
      reactiveFilterData.status = ""
    } else reactiveFilterData.status = dataArray
  }

  if (divName === "Year") {
    if (yearValue.value === dataArray) {
      reactiveFilterData.start_date = ""
      reactiveFilterData.end_date = ""
      yearValue.value = ""
    } else {
      yearValue.value = dataArray
      reactiveFilterData.start_date = yearValue.value + "-01-01"
      reactiveFilterData.end_date = yearValue.value + "-12-31"
    }
  }

  if (divName === "Genres") {
    const { mal_id, name } = dataArray
    console.log(typeof dataArray)
    const index = reactiveFilterData.genres.indexOf(mal_id)
    const indexName = genreValue.value.indexOf(name)
    if (index === -1) {
      reactiveFilterData.genres.push(mal_id)
      genreValue.value.push(name)
    } else {
      reactiveFilterData.genres.splice(index, 1)
      genreValue.value.splice(indexName, 1)
    }
  }
  if (divName === "Order By") {
    if (reactiveFilterData.order_by == dataArray) {
      reactiveFilterData.order_by = ""
    } else reactiveFilterData.order_by = dataArray
  }
  if (dataArray === "Popularity") {
    reactiveFilterData.sort = "asc"
  }
}
const filterValueDisplay = (filterValue) => {
  return computed(() => {
    if (Array.isArray(filterValue.value)) {
      if (filterValue.value.length === 0) {
        return "Any"
      } else if (filterValue.value.length === 1) {
        return `${filterValue.value[0]}`
      } else {
        return [filterValue.value[0], ...Array(filterValue.value.length - 1).fill("+")]
      }
    } else {
      return filterValue.value
    }
  })
}
const genreFilterValueDisplay = filterValueDisplay(genreValue)

const toggleSort = () => {
  reactiveFilterData.sort = reactiveFilterData.sort === "asc" ? "desc" : "asc"
}

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
const isLoading = ref(false)
const hasNextPage = ref(false)
const fetchData = async () => {
  try {
    isLoading.value = true
    const Api = await axios.get("https://api.jikan.moe/v4/anime", {
      params: reactiveFilterData,
      paramsSerializer: paramsSerializer
    })
    console.log(
      "Request URL:",
      `https://api.jikan.moe/v4/anime?${new URLSearchParams(reactiveFilterData).toString()}`
    )
    const newData = Api.data.data
    if (reactiveFilterData.page === 1) {
      data.value = newData
    } else {
      data.value = [...data.value, ...newData]
    }
    // Example: Check if there are more pages to load
    hasNextPage.value = Api.data.pagination.has_next_page // Adjust based on API response

    /*  if (!hasNextPage.value) {
      observer.value.disconnect() // Disconnect observer when no more data
    } */
    console.log(hasNextPage)
  } catch (error) {
    console.log("error")
  } finally {
    isLoading.value = false
  }
}
const fetchgenres = async () => {
  try {
    const api = await axios.get("https://api.jikan.moe/v4/genres/anime")

    const excludeGenres = ["Ecchi", "Boys Love", "Magical Sex Shift", "Ecchi", "Erotica", "Hentai"]
    anime_genre.value = api.data.data.filter((a) => !excludeGenres.includes(a.name))

    console.log(anime_genre.value)
  } catch (err) {
    console.log(err)
  }
}

onMounted(() => {
  fetchData()
  fetchgenres()
})

watch(reactiveFilterData, () => {
  fetchData()
})
// Infinite Scroll
const loadMore = () => {
  if (hasNextPage.value) {
    reactiveFilterData.page += 1
    console.log(data)
    fetchData()
  } else console.log("No Data")
}
</script>

<template>
  <Cont_ainer>
    <div class="filter_container">
      <!-- Start Anime Search -->
      <div class="search margin_top">
        <span class="span_lable">Search</span>
        <div class="filter_a" @click="toggleSearch" v-click-outside="closeSearchVisible">
          <img src="./icons/search.svg" alt="" @click.stop="toggleSearch" /><input
            type="text"
            @click.stop="toggleSearch"
            v-model.trim="reactiveFilterData.q"
          />
        </div>
      </div>
      <!-- Start Anime Search-->

      <!-- Start Anime Genres -->
      <div class="genres margin_top">
        <Anime_FilterComponet
          :divFilterName="'Genres'"
          :toggleDropDown="toggleGenresDropdown"
          :valueFilter="genreFilterValueDisplay"
          :visible="genresVisible"
          :loopDataArray="anime_genre"
          :closeDropdown="closeGenresVisible"
          :toggleSelection="toggleFilterFormat"
        />
      </div>
      <!-- Start Anime Genres -->

      <!-- Start Anime Year -->
      <div class="year margin_top">
        <Anime_FilterComponet
          :divFilterName="'Year'"
          :toggleDropDown="toggleYearDropdown"
          :valueFilter="yearValue"
          :visible="yearVisible"
          :loopDataArray="anime_year"
          :closeDropdown="closeYearVisible"
          :toggleSelection="toggleFilterFormat"
        />
      </div>
      <!-- End Anime Year -->

      <!-- Start Anime status -->
      <div class="status margin_top">
        <Anime_FilterComponet
          :divFilterName="'Status'"
          :toggleDropDown="togglestatusDropdown"
          :valueFilter="reactiveFilterData.status"
          :visible="statusVisible"
          :loopDataArray="anime_status"
          :closeDropdown="closestatusVisible"
          :toggleSelection="toggleFilterFormat"
        />
      </div>

      <!-- End Anime status -->

      <!-- Start Anime Format -->
      <div class="format margin_top">
        <Anime_FilterComponet
          :divFilterName="'Format'"
          :toggleDropDown="toggleFormatDropdown"
          :valueFilter="reactiveFilterData.type"
          :visible="formatVisible"
          :loopDataArray="anime_format"
          :closeDropdown="closeFormatVisible"
          :toggleSelection="toggleFilterFormat"
        />
      </div>
      <!-- End Anime Format -->

      <!-- End Anime Order By -->
      <div class="orderBy margin_top">
        <Anime_FilterComponet
          :divFilterName="'Order By'"
          :toggleDropDown="toggleOrderByDropdown"
          :valueFilter="reactiveFilterData.order_by"
          :visible="orderByVisible"
          :loopDataArray="anime_orderBy"
          :closeDropdown="closeOrderByVisible"
          :toggleSelection="toggleFilterFormat"
        />
      </div>
      <!-- End Anime Order By -->
      <div class="sort margin_top" @click="toggleSort">
        <img src="./icons/sort.svg" alt="Sort" />
      </div>
    </div>

    <div>
      <h3>Anime List</h3>

      <Anime_Card :childrenData="data" v-if="data" />
      <div v-else>loading . . .</div>
      <Ob_server v-if="data && reactiveFilterData.page" @intersect="loadMore" />
    </div>
  </Cont_ainer>
</template>

<style scoped>
.filter_container {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 9999999;
  flex-wrap: wrap;
}
.margin_top {
  margin-top: 20px;
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

.sort {
  cursor: pointer;
}
div h3 {
  color: #647380;
  font-weight: 800;
  font-size: 35px;
  font-family: monospace;
  margin: 25px 0;
}
</style>
