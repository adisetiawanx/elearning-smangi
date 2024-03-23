<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Guru Siswa : {{ teacherData.name }}</template>
    <template #content>
      <AddTeacherClassModal
        :teacherId="teacherId"
        :fetch-teacher-data="fetchTeacherData"
        :is-open="isModalAddClassOpen"
        @close="() => (isModalAddClassOpen = false)"
      />
      <AddTeacherSubjectModal
        :teacherId="teacherId"
        :fetch-teacher-data="fetchTeacherData"
        :is-open="isModalAddSubjectOpen"
        @close="() => (isModalAddSubjectOpen = false)"
      />
      <form v-if="teacherData" @submit.prevent="" class="mt-5 mx-5">
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
          <input type="file" id="foto" accept="image/*" class="mt-1 text-sm" />
        </div>
        <div v-if="teacherData.profile_image" class="mb-4">
          <NuxtImg
            :src="teacherData.profile_image"
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
      <!-- List kelas -->
      <div class="mx-5 mt-2">
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List kelas yang diajarkan</h3>
          <button
            @click="() => (isModalAddClassOpen = true)"
            class="bg-gray-600 rounded shadow-sm p-0.5"
          >
            <PlusIcon class="w-5 text-white" />
          </button>
        </div>
        <p
          v-if="teacherData.Class && teacherData.Class.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada kelas yang diajarkan...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(kelas, kelasIndex) in teacherData.Class"
            :key="kelas.id"
            :class="[
              kelasIndex + 1 == teacherData.Class.length ? 'border-b' : '',
              'border-t',
            ]"
          >
            <div
              class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
            >
              <span class="flex-1 truncate font-medium">
                {{ kelas.name }}
              </span>
            </div>
          </li>
        </ul>
      </div>

      <!-- List Mata Pelajaran -->
      <div class="mx-5 border-t pt-3 mt-5 mb-10">
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List mata pelajaran yang diajarkan</h3>
          <button
            @click="() => (isModalAddSubjectOpen = true)"
            class="bg-gray-600 rounded shadow-sm p-0.5"
          >
            <PlusIcon class="w-5 text-white" />
          </button>
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
            </div>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/outline";
const teacherData = ref<any>({});
const isModalAddClassOpen = ref(false);
const isModalAddSubjectOpen = ref(false);

const { getTeacherById } = useTeacher();

const route = useRoute();
const teacherId = route.params.id as string;

const fetchTeacherData = async () => {
  teacherData.value = await getTeacherById(teacherId);
};

onMounted(async () => {
  await fetchTeacherData();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
