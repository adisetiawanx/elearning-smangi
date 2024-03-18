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
      <!-- The backdrop, rendered as a fixed sibling to the panel container -->
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex min-h-full items-center justify-center p-4">
          <!-- The actual dialog panel -->
          <HeadlessDialogPanel class="w-full max-w-5xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Tambahkan Siswa Baru</HeadlessDialogTitle
            >

            <!-- Form for adding Siswa -->
            <form @submit.prevent="addSiswa" class="mt-3">
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="siswa.email"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                  >Password
                  <span
                    @click="generateRandomPassword"
                    class="ml-1 underline text-blue-500 text-xs font-light cursor-pointer hover:text-blue-600 select-none"
                    draggable="false"
                    >Generate</span
                  ></label
                >
                <input
                  type="text"
                  id="password"
                  v-model="siswa.password"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                  >Nama</label
                >
                <input
                  type="text"
                  id="name"
                  v-model="siswa.name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label for="nip" class="block text-sm font-medium text-gray-700"
                  >No. Induk Siswa</label
                >
                <input
                  type="text"
                  id="nip"
                  v-model="siswa.nip"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                  >No. Handphone</label
                >
                <input
                  type="text"
                  id="phone"
                  v-model="siswa.phone"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label
                  for="kelas"
                  class="block text-sm font-medium text-gray-700"
                  >Kelas</label
                >
                <select
                  id="kelas"
                  v-model="siswa.kelas"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Pilih Kelas</option>
                  <option value="Kelas 1">Kelas 1</option>
                  <option value="Kelas 2">Kelas 2</option>
                  <option value="Kelas 3">Kelas 3</option>
                  <!-- Add more options as needed -->
                </select>
              </div>
              <div class="mb-4">
                <label
                  for="foto"
                  class="block text-sm font-medium text-gray-700"
                  >Foto Profile</label
                >
                <input
                  type="file"
                  id="foto"
                  @change="uploadProfilePicture"
                  accept="image/*"
                  class="mt-1 text-sm"
                />
              </div>
              <div v-if="siswa.profileUrl" class="mb-4">
                <NuxtImg
                  :src="siswa.profileUrl"
                  width="400"
                  layout="fixed"
                  class="rounded shadow-sm"
                />
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
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
});

const siswa = ref({
  email: "",
  name: "",
  password: "",
  nip: "",
  phone: "",
  kelas: "",
  profileUrl: null as string | null,
});

const closeModal = () => {
  emit("close");
};

const emit = defineEmits(["close"]);

const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).slice(-8);
  siswa.value.password = randomPassword;
};

const uploadProfilePicture = async (event: Event) => {
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch(
    "/api/administrator/student/profile",
    {
      method: "POST",
      body: formData,
    }
  );

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    siswa.value.profileUrl = respone.value.data?.url;
  }
};

const addSiswa = async () => {
  if (
    !siswa.value.email ||
    !siswa.value.password ||
    !siswa.value.name ||
    !siswa.value.nip ||
    !siswa.value.phone ||
    !siswa.value.kelas ||
    !siswa.value.profileUrl
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  await useFetch("/api/administrator/student", {
    method: "POST",
    body: {
      email: siswa.value.email,
      name: siswa.value.name,
      nip: siswa.value.nip,
      phone: siswa.value.phone,
      kelas: siswa.value.kelas,
      profile_url: siswa.value.profileUrl,
    },
  });

  alert("Siswa berhasil ditambahkan!");
  closeModal();
};
</script>
