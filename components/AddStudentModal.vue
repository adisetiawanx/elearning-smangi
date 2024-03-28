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
          <HeadlessDialogPanel class="w-full max-w-5xl rounded bg-white p-5">
            <HeadlessDialogTitle class="border-b pb-3 font-medium text-lg"
              >Tambahkan Siswa Baru</HeadlessDialogTitle
            >

            <form @submit.prevent="addStudent" class="mt-3">
              <div class="mb-4">
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                  >Email</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="student.email"
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
                  v-model="student.password"
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
                  v-model="student.name"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div class="mb-4">
                <label for="nis" class="block text-sm font-medium text-gray-700"
                  >No. Induk Siswa</label
                >
                <input
                  type="text"
                  id="nis"
                  v-model="student.nis"
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
                  v-model="student.phone"
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
                  v-model="student.kelas"
                  class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">Pilih Kelas</option>
                  <option
                    v-for="(kelas, kelasIndex) in listKelas"
                    :key="kelasIndex"
                    :value="kelas.name"
                  >
                    {{ kelas.name }}
                  </option>
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
                  accept="image/png, image/jpeg, image/webp"
                  class="mt-1 text-sm"
                />
              </div>

              <div class="mb-4">
                <Spinner v-if="isUploadProfilePicture" />
                <NuxtImg
                  v-else-if="student.profileUrl && !isUploadProfilePicture"
                  :src="student.profileUrl"
                  width="300"
                  layout="fixed"
                  class="rounded shadow-sm"
                />
              </div>

              <Spinner v-if="addStudentStatus.isLoading" class="mt-3" />
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
  fetchStudentsData: {
    type: Function as PropType<() => Promise<void>>,
    required: true,
  },
});

const { getListKelas } = useKelas();

const addStudentStatus = ref({
  isLoading: false,
  isError: false,
  isSuccess: false,
});

const student = ref({
  email: "",
  name: "",
  password: "",
  nis: "",
  phone: "",
  kelas: "",
  profileUrl: null as string | null,
});

const listKelas = ref<any>([]);
const isUploadProfilePicture = ref(false);

const closeModal = () => {
  emit("close");
};

const emit = defineEmits(["close"]);

const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).slice(-8);
  student.value.password = randomPassword;
};

const uploadProfilePicture = async (event: Event) => {
  isUploadProfilePicture.value = true;
  const formData = new FormData();
  //@ts-expect-error
  formData.append("file", event.target.files[0]);

  const { data: respone, error } = await useFetch("/api/image", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: formData,
  });

  if (error.value) {
    console.error(error.value);
    return;
  }

  if (respone.value) {
    //@ts-expect-error
    student.value.profileUrl = respone.value.data?.url;
  }

  isUploadProfilePicture.value = false;
};

const addStudent = async () => {
  addStudentStatus.value.isLoading = true;
  if (
    !student.value.email ||
    !student.value.password ||
    !student.value.name ||
    !student.value.nis ||
    !student.value.phone ||
    !student.value.kelas ||
    !student.value.profileUrl
  ) {
    alert("Tolong isi semua field!");
    return;
  }

  const { error } = await useFetch("/api/administrator/student", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + useCookie("auth:token").value,
    },
    body: {
      email: student.value.email,
      password: student.value.password,
      name: student.value.name,
      nis: student.value.nis,
      phone: student.value.phone,
      kelas: student.value.kelas,
      profile_url: student.value.profileUrl,
    },
  });

  if (error.value) {
    alert(error.value.message);
  }

  await props.fetchStudentsData();
  addStudentStatus.value.isLoading = false;
  closeModal();
};

onMounted(async () => {
  listKelas.value = await getListKelas({
    take: undefined,
    skip: 0,
    search: "",
  });
});
</script>
