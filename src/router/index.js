import { createRouter, createWebHistory } from 'vue-router'
import MainScreen from '../views/MainScreen'
import SecondScreen from "@/views/SecondScreen";
import ThirdScreen from "@/views/ThirdScreen";


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
  {
    // path: '/details/:id',
    path: '/details',
    name: 'details',
    component: ThirdScreen
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
