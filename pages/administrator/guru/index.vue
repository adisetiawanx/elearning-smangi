<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Siswa</template>
    <template #content>
      <AddTeacherModal
        :fetch-teachers-data="fetchTeachersData"
        :is-open="isOpen"
        @close="closeAddModal"
      />
      <button
        @click="isOpen = true"
        class="inline-flex items-center font-medium bg-green-500 text-white gap-1.5 mx-7 mt-5 py-1.5 px-4 shadow rounded hover:bg-green-600"
      >
        <PlusCircleIcon class="w-5" />
        <span>Guru</span>
      </button>
      <div class="mb-3 mt-5 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="relative rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama siswa"
          />
        </div>
      </div>
      <!-- Guru list -->
      <ul role="list" class="mx-7 border-x">
        <li
          v-for="(teacher, teacherIndex) in teachers"
          :key="teacher.id"
          :class="[
            teacherIndex + 1 == teachers.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ teacher.name }}
            </span>
            <span class="flex-initial truncate tracking-wide">{{
              teacher.nuptk
            }}</span>
            <NuxtLink
              :to="`/administrator/guru/${teacher.id}`"
              class="flex-1 flex justify-end"
            >
              <Cog8ToothIcon
                class="w-6 bg-green-500 p-0.5 rounded shadow text-white cursor-pointer"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Cog8ToothIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";

const isOpen = ref(false);
const { getTeachersData } = useTeacher();

const closeAddModal = () => {
  isOpen.value = false;
};

const teachers = ref<any>([]);

const fetchTeachersData = async () => {
  teachers.value = await getTeachersData({
    take: 20,
    skip: 0,
  });
};

onMounted(async () => {
  await fetchTeachersData();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
