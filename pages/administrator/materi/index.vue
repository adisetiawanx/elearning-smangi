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

      <ul v-if="materialArr.length > 0" role="list" class="mx-7 border-x">
        <li
          v-for="(material, materialIndex) in materialArr"
          :key="materialIndex"
          :class="[
            materialIndex + 1 == materialArr.length ? 'border-b' : '',
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
      <p v-else class="mx-7 text-gray-500 text-sm">
        Tidak ada materi yang tersedia.
      </p>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-5 mx-7">
        <div>
          <button
            :disabled="queryMaterial.skip === 0"
            @click="
              queryMaterial.skip -= queryMaterial.take;
              fetchMaterialList();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon class="w-5" />
            <span>Previous</span>
          </button>
        </div>
        <span class="mr-2 font-medium text-sm text-gray-500"
          >Page
          {{ Math.floor(queryMaterial.skip / queryMaterial.take) + 1 }}</span
        >
        <div>
          <button
            :disabled="materialArr.length < queryMaterial.take"
            @click="
              queryMaterial.skip += queryMaterial.take;
              fetchMaterialList();
            "
            class="inline-flex items-center font-medium border text-gray-500 text-sm gap-1.5 py-1 px-2.5 shadow rounded hover:bg-gray-100 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ArrowRightIcon class="w-5" />
          </button>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
  Cog8ToothIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/vue/24/outline";

const { getListMaterial } = useMaterial();

const route = useRoute();
const page = route.query.page ? Number(route.query.page) : 1;

const materialArr = ref<any>([]);

const queryMaterial = ref({
  take: 20,
  skip: (page - 1) * 20,
});

const fetchMaterialList = async () => {
  const materials = await getListMaterial({
    take: queryMaterial.value.take,
    skip: queryMaterial.value.skip,
  });
  materialArr.value = materials;
};

onMounted(async () => {
  await fetchMaterialList();
});

definePageMeta({
  middleware: "is-administrator",
});
</script>
