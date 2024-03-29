<template>
  <HeadlessTransitionRoot
    :show="props.isOpen"
    as="template"
    enter="duration-300 ease-out"
    enter-from="opacity-0"
    enter-to="opacity-100"
    leave="duration-200 ease-in"
    leave-from="opacity-100"
    leave-to="opacity-0"
  >
    <HeadlessDialog
      :open="props.isOpen"
      @close="closeModal"
      class="relative z-50"
    >
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <HeadlessDialogPanel class="w-full max-w-xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Tambahkan Kelas Baru</HeadlessDialogTitle
            >

            <form @submit.prevent="addClass" class="mt-3">
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Nama</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="kelas.name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div class="mb-4">
                <label
                  for="kelas"
                  class="block text-sm font-medium text-gray-700"
                  >Jurusan</label
                >
                <select
                  id="kelas"
                  v-model="kelas.jurusan"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Pilih Kelas</option>
                  <option value="IPA">IPA</option>
                  <option value="IPS">IPS</option>
                  <option value="BAHASA">BAHASA</option>
                </select>
              </div>
              <div class="flex justify-end gap-3 mt-5 border-t pt-3">
                <button
                  @click="closeModal"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Siswa
                </button>
              </div>
            </form>
          </HeadlessDialogPanel>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script lang="ts" setup>
const props = defineProps({
  isOpen: Boolean,
  fetchDataKelas: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const kelas = ref({
  name: "",
  jurusan: "",
});

const closeModal = () => {
  emit("close");
};

const addClass = async () => {
  if (!kelas.value.name || !kelas.value.jurusan) {
    alert("Nama dan Jurusan tidak boleh kosong");
    return;
  }

  const { data: respone, error } = await useFetch("/api/administrator/class", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: {
      name: kelas.value.name.toLocaleUpperCase(),
      major: kelas.value.jurusan,
    },
  });

  if (error.value) {
    alert(error.value);
    return;
  }

  if (respone.value) {
    alert("Kelas berhasil ditambahkan");
    props.fetchDataKelas();
  }

  closeModal();
};

const emit = defineEmits(["close"]);
</script>
