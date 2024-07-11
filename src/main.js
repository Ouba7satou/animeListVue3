import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener("click", el.clickOutsideEvent)
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent)
  }
}

// Assuming `App` is your main component
const app = createApp(App)

app.directive("click-outside", clickOutside)

app.use(router)
app.mount("#app")

/* createApp(App).directive("click-outside", clickOutside).mount("#app") */
