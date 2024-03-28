export default defineNuxtRouteMiddleware(async (to, from) => {
  const { status, data } = useAuth();
  if (status.value === "authenticated" && data.value.role === "student") {
    return;
  } else {
    return navigateTo("/student/login", { replace: true });
  }
});
