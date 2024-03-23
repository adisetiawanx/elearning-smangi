export default () => {
  const getStudentsData = async (querySiswa: {
    take: number;
    skip: number;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/student?take=${querySiswa.take}&skip=${querySiswa.skip}`
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getStudentById = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/student/${id}`
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };
  return {
    getStudentsData,
    getStudentById,
  };
};
