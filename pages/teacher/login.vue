<template>
  <div
    class="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-20 w-auto" src="/logo.png" alt="Smangi" />
      <h2
        class="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Silahkan login terlebih dahulu (Guru)
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="loginHandler">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              v-model="userInput.email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="userInput.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            class="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium leading-5 text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            type="submit"
            :loading="loginStatus.isLoading"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const loginStatus = ref({
  isLoading: false,
  error: "",
});
const userInput = ref({
  email: "",
  password: "",
});
const { signIn } = useAuth();

const loginHandler = async () => {
  try {
    loginStatus.value.isLoading = true;
    await signIn(
      {
        email: userInput.value.email,
        password: userInput.value.password,
        loginType: "teacher",
      },
      { callbackUrl: "/teacher" }
    );
  } catch (error) {
    if (error instanceof Error) {
      loginStatus.value.error = error.message;
      alert(error.message);
    }
  } finally {
    loginStatus.value.isLoading = false;
  }
};

definePageMeta({
  middleware: "is-teacher-login",
});

useHead({
  title: "Login Guru",
});
</script>
