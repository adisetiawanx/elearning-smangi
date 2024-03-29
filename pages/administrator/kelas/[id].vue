<template>
  <NuxtLayout name="administrator-dashboard">
    <template #header>Edit Kelas</template>
    <template #content>
      <form v-if="kelasData" @submit.prevent="updateClass" class="mt-5 mx-5">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="name"
            v-model="kelasData.name"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div class="mb-4">
          <label for="kelas" class="block text-sm font-medium text-gray-700"
            >Jurusan</label
          >
          <select
            id="kelas"
            v-model="kelasData.major"
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            <option value="">Pilih Kelas</option>
            <option value="IPA">IPA</option>
            <option value="IPS">IPS</option>
            <option value="BAHASA">BAHASA</option>
          </select>
        </div>

        <div class="flex justify-end gap-3 mt-5 border-t pt-3">
          <UISpinner v-if="updateClassStatus.isLoading" />
          <button
            v-else
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Simpan
          </button>
        </div>
      </form>
      <div class="mx-5 mt-2">
        <div class="mb-2 flex gap-2 items-center">
          <h3 class="font-medium">List mata pelajaran</h3>
        </div>
        <p
          v-if="kelasData.Subject && kelasData.Subject.length <= 0"
          class="text-sm text-gray-500"
        >
          Tidak ada mata pelajaran...
        </p>
        <ul v-else role="list" class="border-x max-h-96 overflow-y-auto">
          <li
            v-for="(subject, subjectIndex) in kelasData.Subject"
            :key="subject.id"
            :class="[
              subjectIndex + 1 == kelasData.Subject.length ? 'border-b' : '',
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
const kelasData = ref<any>({});

const { getKelasById } = useKelas();

const route = useRoute();
const kelasId = route.params.id as string;

const updateClassStatus = ref({
  isLoading: false,
  isSuccess: false,
  isFailed: false,
});

const updateClass = async () => {
  updateClassStatus.value.isLoading = true;

  if (!kelasData.value.name || !kelasData.value.major) {
    alert("Tolong isi semua field!");
    updateClassStatus.value.isLoading = false;
    return;
  }

  const { data: respone, error } = await useFetch(
    `/api/administrator/class/${kelasId}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
      body: {
        name: kelasData.value.name,
        major: kelasData.value.major,
      },
    }
  );

  if (error.value) {
    alert(error.value.message);
  }

  if (respone.value) {
    updateClassStatus.value.isSuccess = true;
    kelasData.value = respone.value.data;
    alert("Berhasil mengupdate data kelas!");
  }
  updateClassStatus.value.isLoading = false;
};

const fetchClassData = async () => {
  kelasData.value = await getKelasById(kelasId);
};

onMounted(async () => {
  await fetchClassData();
});

definePageMeta({
  middleware: "is-administrator",
});

useHead({
  title: "Edit Kelas",
});
</script>
