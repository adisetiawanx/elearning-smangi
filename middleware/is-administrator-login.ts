export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  if (status.value === "authenticated") {
    return navigateTo("/administrator", { replace: true });
  } else {
    return;
  }
});
