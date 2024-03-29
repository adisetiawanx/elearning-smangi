export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();
  if (status.value === "authenticated" && data.value.role === "administrator") {
    return navigateTo("/administrator", { replace: true });
  } else {
    return;
  }
});
