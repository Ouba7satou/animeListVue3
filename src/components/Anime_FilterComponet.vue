<script setup>
const props = defineProps([
  "toggleDropDown",
  "closeDropdown",
  "valueFilter",
  "filterValueDisplay",
  "visible",
  "loopDataArray",
  "toggleSelection",
  "divFilterName",
  "filterValueToggle"
])
</script>

<template>
  <span class="span_label">{{ divFilterName }}</span>
  <div class="filter_a" @click="toggleDropDown" v-click-outside="closeDropdown">
    <span @click.stop="toggleDropDown">
      <span v-if="Array.isArray(valueFilter)">
        <span v-if="valueFilter.length !== 0" class="span_select">{{ valueFilter[0] }}</span>
        <span v-if="valueFilter.length > 1" class="span_select">+{{ valueFilter.length - 1 }}</span>
        <span v-if="valueFilter.length === 0">Any</span>
      </span>
      <span v-else>
        <span v-if="valueFilter !== '' && valueFilter !== null" class="span_select">{{
          valueFilter
        }}</span>
        <span v-else>Any</span>
      </span>
    </span>
    <img src="./icons/dropDown.svg" alt="dropDown" @click.stop="toggleDropDown" />
    <div class="drop_Down-menu" v-if="visible">
      <ul>
        <li
          v-for="dataArray in loopDataArray"
          :key="dataArray"
          @click="toggleSelection(dataArray, divFilterName)"
        >
          {{ dataArray.name ? dataArray.name : dataArray }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
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
.filter_container .span_label {
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
  max-height: 330px;
  overflow: hidden;
  background-color: white;
}
.drop_Down-menu:hover {
  overflow-y: scroll;
}
.drop_Down-menu ul li {
  padding: 5px 13px;
  font-weight: 500;
  color: #647380;
  font-size: 13px;
  position: relative;
  margin: 5px;
  transition: 0.5s ease;
}
.drop_Down-menu ul li:hover {
  background-color: #dde6ee;
  border-radius: 4px;
  color: #647380;
}
.selected::after {
  content: "";
  background-image: url("./icons/correct.svg");
  background-position: center;
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  right: 5px;
  top: 7px;
  bottom: 0px;
  background-size: cover;
  background-repeat: no-repeat;
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
