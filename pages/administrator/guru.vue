<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Siswa</template>
    <template #content>
      <button
        class="inline-flex items-center font-medium bg-green-500 text-white gap-1 mx-7 mt-5 py-1 px-5 shadow rounded hover:bg-green-600 focus:outline-none focus:ring-2"
      >
        <PlusCircleIcon class="w-5" />
        <span>Guru</span>
      </button>
      <div class="mb-3 mt-5 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="relative rounded shadow-sm">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama siswa"
          />
        </div>
      </div>
      <!-- Siswa list -->
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
            <span class="truncate font-medium">
              {{ teacher.name }}
            </span>
            <span class="truncate tracking-wide">{{ teacher.nip }}</span>
            <EyeIcon
              v-if="teacher.active"
              class="w-6 bg-green-500 p-0.5 rounded shadow text-white"
            />
            <EyeSlashIcon
              v-else
              class="w-6 bg-red-500 p-0.5 rounded shadow text-white"
            />
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  EyeIcon,
  EyeSlashIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";
const teachers = ref([
  {
    id: 1,
    name: "Ni Luh Putu",
    nip: "1234567890",
    active: true,
  },
  {
    id: 1,
    name: "Ni Luh Putu",
    nip: "1234567890",
    active: false,
  },
  {
    id: 1,
    name: "Ni Luh Putu",
    nip: "1234567890",
    active: true,
  },
]);

definePageMeta({
  middleware: "is-administrator",
});
</script>
