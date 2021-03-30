import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue"
// import MyEvents from '../src/components/MyEvents.vue'
// import UpcomingEvents from '../src/components/UpcomingEvents.vue'
// import BookedEvents from '../src/components/BookedEvents.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresVisitor: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

function isLoggedIn() {
    return localStorage.getItem('token')
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isLoggedIn()) {
        next({
          name: 'Login',
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (isLoggedIn()) {
        next({
          name: 'Dashboard',
        })
      } else {
        next()
      }
    } else {
      next() 
    }
  })

export default router;
