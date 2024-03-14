import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import PrimeVue from 'primevue/config';
//component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

//bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//notifications
import Notifications from 'notiwind';
import './assets/style.css';
//primevue
// import "primevue/resources/themes/aura-light-blue/theme.css";
// import "primeicons/primeicons.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(Notifications);
app.use(PrimeVue);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount('#app');