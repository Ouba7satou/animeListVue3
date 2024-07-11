import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/about",
      name: "about",

      component: () => import("../views/AboutView.vue")
    },
    {
      path: "/user/:user_id",
      name: "user",
      component: () => import("../views/ProfileView.vue")
    },
    {
      path: "/search/anime",
      name: "Anime",
      component: () => import("../views/BrowseAnimeView.vue")
    },
    {
      path: "/anime/:id/:anime_name",
      name: "AnimeCardInfo",
      component: () => import("../views/AnimeCardView.vue")
    }
  ]
})

export default router
