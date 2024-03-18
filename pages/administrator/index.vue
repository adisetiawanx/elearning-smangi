<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Home</template>
    <template #content>
      <!-- Tugas list -->
      <div class="mt-5">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-gray-900">Tugas Terbaru</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="project in projects" :key="project.id">
            <a
              href="#"
              class="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span
                  :class="[
                    project.bgColorClass,
                    'h-2.5 w-2.5 flex-shrink-0 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate text-sm font-medium leading-6">
                  {{ project.title }}
                  {{ " " }}
                  <span class="truncate font-normal text-gray-500"
                    >in Kelas {{ project.room }}</span
                  >
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

      <!-- Materi list -->
      <div class="mt-10">
        <div class="px-4 sm:px-6">
          <h2 class="text-sm font-medium text-gray-900">Meteri Terbaru</h2>
        </div>
        <ul
          role="list"
          class="mt-3 divide-y divide-gray-100 border-t border-gray-200"
        >
          <li v-for="project in projects" :key="project.id">
            <a
              href="#"
              class="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
            >
              <span class="flex items-center space-x-3 truncate">
                <span
                  :class="[
                    project.bgColorClass,
                    'h-2.5 w-2.5 flex-shrink-0 rounded-full',
                  ]"
                  aria-hidden="true"
                />
                <span class="truncate text-sm font-medium leading-6">
                  {{ project.title }}
                  {{ " " }}
                  <span class="truncate font-normal text-gray-500"
                    >in Kelas {{ project.room }}</span
                  >
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

const projects = [
  {
    id: 1,
    title: "Membuat kesimpulan pada bab 3",
    room: "12 MIPA 3",
    bgColorClass: "bg-pink-600",
  },
];

definePageMeta({
  middleware: "is-administrator",
});
</script>
