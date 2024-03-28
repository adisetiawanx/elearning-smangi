export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();
  if (status.value === "authenticated") {
    return navigateTo("/student", { replace: true });
  } else {
    return;
  }
});
