import { createApp } from 'vue'
import App from './App.vue'
//bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//font-awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//notifications
import Notifications from 'notiwind'
//
import './assets/style.css'

import router from './router'
import store from './store';

createApp(App).use(router).use(store).use(Notifications).component("font-awesome-icon", FontAwesomeIcon).mount('#app')