<template>
  <div class="container">
    <slot></slot>
  </div>
</template>
<style scoped>
.container {
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}
/* Small */
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
  .globle-heading {
    font-size: 80px;
  }
}
/* medium */
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
/* Large */
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}

/* End Components*/
</style>
