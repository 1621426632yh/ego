import Vue from 'vue'
import VueRouter from 'vue-router'
import Laytou from '../pages/Layout.vue'
import Login from '../pages/Login'
import Content from '../pages/Content'
import Params from '../pages/Params'
import Product from '../pages/Product'
import store from '../store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Laytou',
    redirect:{name:'Product'},
    component: Laytou,
    children:[
      {
        path:"product",
        name:"Product",
        component:Product,
        meta:{
          isLogin:true
        }
      },
      {
        path:"params",
        name:"Params",
        component:Params,
        meta:{
          isLogin:true
        }
      },
      {
        path:"content",
        name:"Content",
        component:Content,
        meta:{
          isLogin:true
        }
      },
    ]
  },
  {
    path:"/login",
    name:"Login",
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){
    var token = store.state.LoginModule.token
    if(token){
      next();
    }else{
      next({
        path:"/login"
      })
    }
  }else{
    next();
  }
})
export default router
