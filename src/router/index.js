import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import { useGlobalStore, usePaginationStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});


router.beforeResolve((routeTo, routeFrom, next) => {
  if (routeFrom.name) {
    const globalStore = useGlobalStore();
    const paginationStore = usePaginationStore();
    globalStore.showLoader();
    paginationStore.initiate();
  }
  next();
});


router.beforeEach(async (to, from, next) => {
    // Set title of the HTML Pgae from route meta
    if (to.meta?.title) {
        document.title = to.meta.title;
    }

    next();
});


router.afterEach(() => {
  const globalStore = useGlobalStore();
  globalStore.hideLoader();
});

router.onError((error) => {
  try{
    if (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes("Importing a module script failed")) {
      router.go(0);
    }
  }
  catch(e){
    console.log(e);
  }
});

export default router;