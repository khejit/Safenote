import { safenote_backend_1 } from "../../declarations/safenote_backend_1";
import { safenote_backend_2 } from "../../declarations/safenote_backend_2";
import { safenote_backend_3 } from "../../declarations/safenote_backend_3";


import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';

import App from "./App";
import NewNote from "./pages/NewNote";
import ReadNote from "./pages/ReadNote";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Donate from "./pages/Donate";
import Contact from "./pages/Contact";

const routes = [
  { path: '/', component: NewNote },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/donate', component: Donate },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', component: ReadNote }
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
