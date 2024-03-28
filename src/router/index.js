import { createRouter, createWebHistory } from 'vue-router'
import MainScreen from '../views/MainScreen'
import SecondScreen from "@/views/SecondScreen";


const routes = [
  {
    path: '/',
    name: 'home',
    component: MainScreen
  },
  {
    path: '/halls',
    name: 'halls',
    component: SecondScreen
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
