import Vue from 'vue'
import VueRouter from 'vue-router'
/*原来方式：通过import xxx from 'xxx'的方式加载组件（无论是否使用组件都会被加载）*/
// import Recommend from "../views/Recommend";
// import Singer from "../views/Singer";
// import Rank from "../views/Rank";
// import Search from "../views/Search";

/*按需加载：*/
const Recommend = (resolve) => {
  import("../views/Recommend").then((module) => {
    resolve(module)
  })
};
const Detail = (resolve) => {
  import("../views/Detail").then((module) => {
    resolve(module)
  })
};
const Singer = (resolve) => {
  import("../views/Singer").then((module) => {
    resolve(module)
  })
};
const Rank = (resolve) => {
  import("../views/Rank").then((module) => {
    resolve(module)
  })
};
const Search = (resolve) => {
  import("../views/Search").then((module) => {
    resolve(module)
  })
};


Vue.use(VueRouter);

const routes = [
  {
    /*设置默认路由地址*/
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    /*设置二级路由*/
    children: [
      {
        path: 'detail/:id',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
