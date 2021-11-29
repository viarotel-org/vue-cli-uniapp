/* eslint-disable */
import { RouterMount, createRouter } from "uni-simple-router";
import permission from "./permission";

const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES],
});

permission(router);

export { router, RouterMount };
