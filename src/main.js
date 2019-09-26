import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Editor from 'v-markdown-editor'

import ViewBlogContent from './components/pages/ViewBlogContent'
import Homepage from './components/pages/Homepage'
import NewBlog from './components/layouts/NewBlog'
import ManageBlogs from './components/pages/ManageBlogs';
import EditBlogs from './components/layouts/EditBlog';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Editor);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Homepage },
    { path: '/view-content/:blog_id', name:'viewblog', component: ViewBlogContent },
    { path: '/addblog', component: NewBlog },
    { path: '/manageblogs', component: ManageBlogs },
    { path: '/editblog/:blog_id', name: 'editblog', component: EditBlogs }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
