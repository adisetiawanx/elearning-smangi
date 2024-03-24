<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/administrator/guru')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Edit Guru</template
    >
    <template #content>
      <form
        v-if="teacherData"
        @submit.prevent="updateTeacher"
        class="mt-5 mx-5"
      >
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="teacherData.email"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password
          </label>
          <input
            type="text"
            id="password"
            v-model="teacherData.password"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
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
          <label for="nis" class="block text-sm font-medium text-gray-700"
            >No. Unik Pendidik dan Tenaga Kependidikan</label
          >
          <input
            type="text"
            id="nis"
            v-model="teacherData.nuptk"
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
            accept="image/*"
            class="mt-1 text-sm"
          />
        </div>
        <div class="mb-4">
          <Spinner v-if="isUploadProfilePicture" />
          <NuxtImg
            v-else-if="teacherData.profile_image && !isUploadProfilePicture"
            :src="teacherData.profile_image"
            width="300"
            layout="fixed"
            class="rounded shadow-sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <button
            :disabled="isUploadProfilePicture"
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
          >
            Simpan
          </button>
        </div>
      </form>

      <!-- List Mata Pelajaran -->
      <div class="mx-5 border-t pt-3 mt-5 mb-10">
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List mata pelajaran yang diajarkan</h3>
        </div>
        <p
          v-if="teacherData.Subject && teacherData.Subject.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada mata pelajaran yang diajarkan...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(subject, subjectIndex) in teacherData.Subject"
            :key="subject.id"
            :class="[
              subjectIndex + 1 == teacherData.Subject.length ? 'border-b' : '',
              'border-t',
            ]"
          >
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ subject.name }}
              </span>
              <span class="flex-1 truncate">
                {{ subject.Class.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";

const teacherData = ref<any>({});
const updateTeacherStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});
const isUploadProfilePicture = ref(false);

const { getTeacherById } = useTeacher();

const route = useRoute();
const teacherId = route.params.id as string;

const fetchTeacherData = async () => {
  teacherData.value = await getTeacherById(teacherId);
};

const uploadProfilePicture = async (event: Event) => {
  isUploadProfilePicture.value = true;
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch("/api/administrator/image", {
    method: "POST",
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
  console.log(teacherData.value);
  if (
    !teacherData.value.email ||
    !teacherData.value.password ||
    !teacherData.value.name ||
    !teacherData.value.nuptk ||
    !teacherData.value.phone ||
    !teacherData.value.profile_image
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/administrator/teacher/${teacherId}`,
    {
      method: "PUT",
      body: {
        email: teacherData.value.email,
        password: teacherData.value.password,
        name: teacherData.value.name,
        nuptk: teacherData.value.nuptk,
        phone: teacherData.value.phone,
        profile_url: teacherData.value.profile_image,
      },
    }
  );

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateTeacherStatus.value.isSuccess = true;
    teacherData.value = respone.value.data;
    alert("Berhasil mengupdate data guru!");
  }
  updateTeacherStatus.value.isLoading = false;
};

onMounted(async () => {
  await fetchTeacherData();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
