<template>
  <NuxtLayout name="teacher-dashboard">
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
        v-if="teacherData"
        @submit.prevent="updateTeacher"
        class="mt-5 mx-5"
      >
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            v-model="teacherData.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="nuptk" class="block text-sm font-medium text-gray-700"
            >No. Unik Pendidik dan Tenaga Kependidikan</label
          >
          <input
            disabled
            type="text"
            id="nuptk"
            :value="teacherData.nuptk"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            disabled
            type="email"
            id="email"
            :value="teacherData.email"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="text"
            id="password"
            v-model="teacherData.password"
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
            v-model="teacherData.phone"
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
          <img
            v-else-if="teacherData.profile_image && !isUploadProfilePicture"
            :src="teacherData.profile_image"
            width="300"
            class="rounded shadow-sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <UISpinner v-if="updateTeacherStatus.isLoading" />
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

const { getTeacher } = useTeacher();
const { signOut } = useAuth();
const router = useRouter();

const teacherData = ref<any>({});
const updateTeacherStatus = ref({
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
    teacherData.value.profile_image = respone.value.data?.url;
  }

  isUploadProfilePicture.value = false;
};

const updateTeacher = async () => {
  updateTeacherStatus.value.isLoading = true;

  if (
    !teacherData.value.email ||
    !teacherData.value.password ||
    !teacherData.value.name ||
    !teacherData.value.phone ||
    !teacherData.value.profile_image
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { data: respone, error } = await useFetch(`/api/teacher/setting`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: {
      email: teacherData.value.email,
      password: teacherData.value.password,
      name: teacherData.value.name,
      nuptk: teacherData.value.nuptk,
      phone: teacherData.value.phone,
      profile_url: teacherData.value.profile_image,
    },
  });

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateTeacherStatus.value.isSuccess = true;
    teacherData.value = respone.value.data;
    alert("Berhasil mengupdate data teacher, anda harus login ulang!");
    signOut({
      callbackUrl: "/teacher/login",
    });
  }
  updateTeacherStatus.value.isLoading = false;
};

onMounted(async () => {
  teacherData.value = await getTeacher();
});

definePageMeta({
  middleware: "is-teacher",
});

useHead({
  title: "Setting",
});
</script>
