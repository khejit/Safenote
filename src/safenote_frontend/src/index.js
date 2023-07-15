
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
  { path: '/', name: 'newNote', component: NewNote },
  { path: '/privacy-policy', component: PrivacyPolicy },
  { path: '/donate', component: Donate },
  { path: '/contact', component: Contact },
  { path: '/:pathMatch(.*)*', name: 'readNote' , component: ReadNote }
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
