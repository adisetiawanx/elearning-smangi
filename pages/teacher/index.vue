<template>
  <NuxtLayout name="teacher-dashboard">
    <template #header>Home</template>
    <template #content>
      <!-- Materi list -->
      <div class="mt-5">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-gray-900">Materi Terbaru</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="material in materials" :key="material.id">
            <a
              href="#"
              class="group flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span
                  :class="[
                    'bg-purple-500 h-2.5 w-2.5 flex-shrink-0 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate text-sm font-medium leading-6">
                  {{ material.title }}
                </span>
              </span>
              <ChevronRightIcon
                class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
      </div>

      <!-- Tugas list -->
      <div class="mt-5">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-gray-900">Tugas Terbaru</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="assignment in assignments" :key="assignment.id">
            <a
              href="#"
              class="group flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span
                  :class="[
                    'bg-indigo-500 h-2.5 w-2.5 flex-shrink-0 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate text-sm font-medium leading-6">
                  {{ assignment.title }}
                </span>
              </span>
              <ChevronRightIcon
                class="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </a>
          </li>
        </ul>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/20/solid";

const materials = ref([
  {
    id: 1,
    title: "Materi Bab 3",
  },
  {
    id: 2,
    title: "Materi Bab 4",
  },
]);

const assignments = ref([
  {
    id: 1,
    title: "Membuat kesimpulan pada bab 3",
  },
  {
    id: 1,
    title: "Menambahkan materi cara membuat paragraph",
  },
]);

definePageMeta({
  middleware: "is-teacher",
});
</script>
