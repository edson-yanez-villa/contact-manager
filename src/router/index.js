import { createRouter, createWebHistory } from "vue-router";
import ContactView from "../views/contact/ContactView.vue";
import GrouptView from "../views/group/GroupView.vue";

const routes = [
  {
    path: "/",
    name: "ContactView",
    component: ContactView,
  },
  {
    path: "/groups",
    name: "GroupView",
    component: GrouptView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
