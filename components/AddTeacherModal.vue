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
              >Tambahkan Guru Baru</HeadlessDialogTitle
            >

            <!-- Form for adding Siswa -->
            <form @submit.prevent="addTeacher" class="mt-3">
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="teacher.email"
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
                  v-model="teacher.password"
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
                  v-model="teacher.name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label for="nip" class="block text-sm font-medium text-gray-700"
                  >No. Unik Pendidik dan Tenaga Kependidikan</label
                >
                <input
                  type="text"
                  id="nip"
                  v-model="teacher.nuptk"
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
                  v-model="teacher.phone"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
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
                  accept="image/png, image/jpeg, image/webp"
                  class="mt-1 text-sm"
                />
              </div>

              <div class="mb-4">
                <Spinner v-if="isUploadProfilePicture" />
                <NuxtImg
                  v-else-if="teacher.profileUrl && !isUploadProfilePicture"
                  :src="teacher.profileUrl"
                  width="300"
                  layout="fixed"
                  class="rounded shadow-sm"
                />
              </div>
              <Spinner v-if="addTeacherStatus.isLoading" class="mt-3" />
              <div v-else class="flex justify-end gap-3 mt-5 border-t pt-3">
                <button
                  @click="closeModal"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Batal
                </button>
                <button
                  :disabled="isUploadProfilePicture"
                  type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed"
                >
                  Add Guru
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
  fetchTeachersData: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const teacher = ref({
  email: "",
  name: "",
  password: "",
  nuptk: "",
  phone: "",
  profileUrl: null as string | null,
});

const addTeacherStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const isUploadProfilePicture = ref(false);

const closeModal = () => {
  emit("close");
};

const emit = defineEmits(["close"]);

const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).slice(-8);
  teacher.value.password = randomPassword;
};

const uploadProfilePicture = async (event: Event) => {
  isUploadProfilePicture.value = true;
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch("/api/image", {
    method: "POST",
    body: formData,
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    teacher.value.profileUrl = respone.value.data?.url;
  }

  isUploadProfilePicture.value = false;
};

const addTeacher = async () => {
  addTeacherStatus.value.isLoading = true;
  if (
    !teacher.value.email ||
    !teacher.value.password ||
    !teacher.value.name ||
    !teacher.value.nuptk ||
    !teacher.value.phone ||
    !teacher.value.profileUrl
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { error } = await useFetch("/api/administrator/teacher", {
    method: "POST",
    body: {
      email: teacher.value.email,
      name: teacher.value.name,
      nuptk: teacher.value.nuptk,
      phone: teacher.value.phone,
      profile_url: teacher.value.profileUrl,
      password: teacher.value.password,
    },
  });

  if (error.value) {
    alert(error.value.message);
    return;
  }

  alert("Guru berhasil ditambahkan!");
  addTeacherStatus.value.isLoading = false;
  await props.fetchTeachersData();
  closeModal();
};
</script>
