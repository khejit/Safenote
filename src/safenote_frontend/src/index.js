import { safenote_backend_1 } from "../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "../../declarations/safenote_backend_3";

/* document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  button.setAttribute("disabled", true);


  try {
    const testId = "id4a";
    const response = await safenote_backend_1.readKey(testId);
    console.log(response);
  } catch (e) {
    console.log(e.message);
  }

  button.removeAttribute("disabled");

  return false;
}); */

import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from "./App";
import Home from "./pages/Home";

const routes = [
  { path: '/', component: Home },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);


app.mount('#app');



class hello {
  name;
  static title = "here";
}