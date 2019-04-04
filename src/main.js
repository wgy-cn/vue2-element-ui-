import Vue from 'vue'
import router from './router/index.js'
import store from './store'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.use(ElementUI);

new Vue({
    el: '#app',
    data:{
      message:999
    },
    router,
    store,
    render: h => h(App)
  })