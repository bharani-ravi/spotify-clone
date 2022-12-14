import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

const app = createApp(App);
// function CheckData(params) {
//   getdata
// }
// function getData(data) {
//   console.log("getdata");
// }
app.use(VueAxios, axios);
app.use(store);
app.mount("#app");
