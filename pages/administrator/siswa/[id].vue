<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>
      <span>
        <ArrowLeftIcon
          @click="navigateTo('/administrator/siswa')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Edit Siswa
    </template>
    <template #content>
      <form
        v-if="studentData"
        @submit.prevent="updateStudent"
        class="mt-5 mx-5"
      >
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="studentData.email"
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
            v-model="studentData.password"
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
            v-model="studentData.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="nis" class="block text-sm font-medium text-gray-700"
            >No. Induk Siswa</label
          >
          <input
            type="text"
            id="nis"
            v-model="studentData.nis"
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
            v-model="studentData.phone"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="kelas" class="block text-sm font-medium text-gray-700"
            >Kelas</label
          >
          <select
            v-if="listKelas.length > 0"
            id="kelas"
            v-model="studentData.Class.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Pilih Kelas</option>
            <option
              v-for="(kelas, kelasIndex) in listKelas"
              :key="kelasIndex"
              :value="kelas.name"
            >
              {{ kelas.name }}
            </option>
          </select>
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
          <Spinner v-if="isUploadProfilePicture" />
          <NuxtImg
            v-else-if="studentData.profile_image && !isUploadProfilePicture"
            :src="studentData.profile_image"
            width="300"
            layout="fixed"
            class="rounded shadow-sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <Spinner v-if="updateStudentStatus.isLoading" />
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
      <div class="mx-5 mt-2"></div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon } from "@heroicons/vue/24/outline";
const studentData = ref<any>({});

const { getStudentById } = useStudent();
const { getListKelas } = useKelas();

const route = useRoute();
const studentId = route.params.id;

const listKelas = ref<any>([]);

const isUploadProfilePicture = ref(false);
const updateStudentStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const uploadProfilePicture = async (event: Event) => {
  isUploadProfilePicture.value = true;
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch("/api/image", {
    method: "POST",
    body: formData,
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    studentData.value.profile_image = respone.value.data?.url;
  }

  isUploadProfilePicture.value = false;
};

const updateStudent = async () => {
  updateStudentStatus.value.isLoading = true;
  console.log(studentData.value);
  if (
    !studentData.value.email ||
    !studentData.value.password ||
    !studentData.value.name ||
    !studentData.value.nis ||
    !studentData.value.phone ||
    !studentData.value.Class.name ||
    !studentData.value.profile_image
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/administrator/student/${studentId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        email: studentData.value.email,
        password: studentData.value.password,
        name: studentData.value.name,
        nis: studentData.value.nis,
        phone: studentData.value.phone,
        kelas: studentData.value.Class.name,
        profile_url: studentData.value.profile_image,
      },
    }
  );

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateStudentStatus.value.isSuccess = true;
    studentData.value = respone.value.data;
    alert("Berhasil mengupdate data siswa!");
  }
  updateStudentStatus.value.isLoading = false;
};

onMounted(async () => {
  studentData.value = await getStudentById(studentId);
  listKelas.value = await getListKelas({
    take: undefined,
    skip: 0,
  });
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
