import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "../views/HomeView.vue"
import CreatePost  from "../views/CreatePostView.vue"
import PostDetail from "../views/PostDetailView.vue"
import NotFound from "../views/NotFoundView.vue"
import EditPost from "../views/EditPostView.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'createPost',
    component: CreatePost
  },
  {
    path: '/details/:id',
    name: 'Post Details',
    component: PostDetail
  },
  {
    path: '/404',
    name: 'Not Found',
    component: NotFound
  },
  {
    path: '/edit/:id',
    name: 'editPost',
    component: EditPost
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
