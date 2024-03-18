export default defineNuxtRouteMiddleware(async (to, from) => {
  const { status, data } = useAuth();

  if (status.value === "authenticated" && data.value.role === "administrator") {
    return;
  } else {
    return navigateTo("/administrator/login", { replace: true });
  }
});
