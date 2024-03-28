<template>
  <NuxtLayout name="student-dashboard">
    <template #header
      ><span>
        <ArrowLeftIcon
          @click="navigateTo('/student/mata-pelajaran')"
          class="w-5 text-gray-500 cursor-pointer"
        />
      </span>
      Detail Materi</template
    >
    <template #content>
      <div class="my-5 mx-5">
        <div class="mb-4">
          <p class="block text-2xl font-medium text-gray-700">
            {{ material.title }}
          </p>
        </div>
        <div class="mb-4 border-y py-4">
          <p
            v-html="material.content"
            class="block text-base text-gray-600 text-justify"
          ></p>
        </div>
        <div>
          <p class="block text-sm font-medium text-gray-700">Files</p>
          <div v-if="material.MediaFile?.length > 0" class="mt-2 space-y-1.5">
            <div
              v-for="file in material.MediaFile"
              :key="file.url"
              class="border py-2 px-3.5 rounded-md flex items-center justify-between gap-2"
            >
              <div class="flex items-center gap-2">
                <DocumentTextIcon class="w-8 text-gray-500" />
                <a
                  :href="file.url"
                  target="_blank"
                  class="text-sm text-blue-500 hover:underline"
                  >{{ file.name }}</a
                >
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-xs mt-1 italic text-gray-500">Tidak ada file</p>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/vue/24/outline";

const route = useRoute();
const materialId = route.params.id;

const { getMaterialByIdForStudent } = useMaterial();

const material = ref<any>({});

const fetchMaterialData = async () => {
  material.value = await getMaterialByIdForStudent(materialId);
  material.value.content = material.value.content.replace(
    /(?:\r\n|\r|\n)/g,
    "<br>"
  );
};

onMounted(async () => {
  await fetchMaterialData();
});

definePageMeta({
  middleware: "is-student",
});
</script>
