export default defineNuxtRouteMiddleware(async (to, from) => {
  const { status, data } = useAuth();

  if (status.value === "authenticated" && data.value.role === "teacher") {
    return;
  } else {
    return navigateTo("/teacher/login", { replace: true });
  }
});
