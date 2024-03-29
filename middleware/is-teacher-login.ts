export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();
  if (status.value === "authenticated" && data.value.role === "teacher") {
    return navigateTo("/teacher", { replace: true });
  } else {
    return;
  }
});
