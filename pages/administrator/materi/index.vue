<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>List Materi</template>
    <template #content>
      <div class="mb-3 mt-3 mx-7">
        <label for="search" class="sr-only">Search</label>
        <div class="rounded shadow-sm">
          <input
            type="text"
            name="search"
            id="search"
            class="block w-full pl-6 pr-3 py-2 border border-gray-300 rounded leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Cari nama materi"
          />
        </div>
      </div>

      <ul role="list" class="mx-7 border-x">
        <li
          v-for="(material, materialIndex) in meterialArr"
          :key="materialIndex"
          :class="[
            materialIndex + 1 == meterialArr.length ? 'border-b' : '',
            'border-t',
          ]"
        >
          <div
            class="group flex items-center justify-between px-4 py-3 hover:bg-gray-50 sm:px-6 text-sm"
          >
            <span class="flex-1 truncate font-medium">
              {{ material.name }}
            </span>
            <div class="flex-1 flex justify-end">
              <NuxtLink
                :to="`/administrator/materi/${material.id}`"
                class="flex-1 flex justify-end"
              >
                <Cog8ToothIcon
                  class="w-6 bg-green-500 p-0.5 rounded shadow text-white cursor-pointer"
                />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ul>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Cog8ToothIcon } from "@heroicons/vue/24/outline";

const { getListMaterial } = useMaterial();

const materialArr = ref<any>([]);

const fetchKelasList = async () => {
  const materials = await getListMaterial({
    take: 20,
    skip: 0,
  });
  materialArr.value = materials;
};

onMounted(async () => {
  await fetchKelasList();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
