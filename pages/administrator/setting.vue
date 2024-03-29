<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>
      <span>
        <ArrowLeftIcon
          @click="router.go(-1)"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Setting</template
    >
    <template #content>
      <form
        v-if="administratorData"
        @submit.prevent="updateAdministrator"
        class="mt-5 mx-5"
      >
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            v-model="administratorData.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="administratorData.email"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="phone" class="block text-sm font-medium text-gray-700"
            >No. Handphone</label
          >
          <input
            type="text"
            id="phone"
            v-model="administratorData.phone"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="foto" class="block text-sm font-medium text-gray-700"
            >Foto Profile</label
          >
          <input
            @change="uploadProfilePicture"
            type="file"
            id="foto"
            accept="image/png, image/jpeg, image/webp"
            class="mt-1 text-sm"
          />
        </div>
        <div class="mb-4">
          <UISpinner v-if="isUploadProfilePicture" />
          <NuxtImg
            v-else-if="
              administratorData.profile_image && !isUploadProfilePicture
            "
            :src="administratorData.profile_image"
            width="300"
            layout="fixed"
            class="rounded shadow-sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <UISpinner v-if="updateAdministratorStatus.isLoading" />
          <button
            v-else
            :disabled="isUploadProfilePicture"
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </form>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const { getAdministrator } = useAdministrator();
const { signOut } = useAuth();

const router = useRouter();

const administratorData = ref<any>({});
const updateAdministratorStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});
const isUploadProfilePicture = ref(false);

const uploadProfilePicture = async (event: Event) => {
  isUploadProfilePicture.value = true;
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch("/api/image", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: formData,
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    administratorData.value.profile_image = respone.value.data?.url;
  }

  isUploadProfilePicture.value = false;
};

const updateAdministrator = async () => {
  updateAdministratorStatus.value.isLoading = true;

  if (
    !administratorData.value.email ||
    !administratorData.value.name ||
    !administratorData.value.phone ||
    !administratorData.value.profile_image
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/administrator/setting`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        email: administratorData.value.email,
        name: administratorData.value.name,
        phone: administratorData.value.phone,
        profile_url: administratorData.value.profile_image,
      },
    }
  );

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateAdministratorStatus.value.isSuccess = true;
    administratorData.value = respone.value.data;
    alert("Berhasil mengupdate data administrator, anda harus login ulang!");
    signOut({
      callbackUrl: "/administrator/login",
    });
  }
  updateAdministratorStatus.value.isLoading = false;
};

onMounted(async () => {
  administratorData.value = await getAdministrator();
});

definePageMeta({
  middleware: "is-administrator",
});

useHead({
  title: "Setting",
});
</script>
