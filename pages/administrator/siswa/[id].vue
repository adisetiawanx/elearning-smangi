<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Edit Siswa : {{ studentData.name }}</template>
    <template #content>
      <form v-if="studentData" @submit.prevent="" class="mt-5 mx-5">
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
          <input type="file" id="foto" accept="image/*" class="mt-1 text-sm" />
        </div>
        <div v-if="studentData.profile_image" class="mb-4">
          <NuxtImg
            :src="studentData.profile_image"
            width="300"
            layout="fixed"
            class="rounded shadow-sm"
          />
        </div>
        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
const studentData = ref<any>({});

const { getStudentById } = useStudent();
const { getListKelas } = useKelas();

const route = useRoute();
const studentId = route.params.id;

const listKelas = ref<any>([]);

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
