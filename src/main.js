import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
// Importaciones axios
import axios from "axios";
import VueAxios from "vue-axios";

createApp(App).use(store).use(VueAxios, axios).use(router).mount("#app");
