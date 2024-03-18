import Camera from "simple-vue-camera";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue-camera", Camera).mount("#app");
});
