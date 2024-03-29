export default defineNuxtRouteMiddleware((to, from) => {
  const { status, data } = useAuth();
  if (status.value === "authenticated" && data.value.role === "student") {
    return navigateTo("/student", { replace: true });
  } else {
    return;
  }
});
