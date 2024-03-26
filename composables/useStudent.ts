export default () => {
  const getStudentsData = async (querySiswa: {
    take: number;
    skip: number;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/student?take=${querySiswa.take}&skip=${querySiswa.skip}&search=${querySiswa.search}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
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
      `/api/administrator/student/${id}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      //@ts-ignore
      return respone.value.data;
    }
  };

  const deleteStudent = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/student/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      return respone.value;
    }
  };
  return {
    getStudentsData,
    getStudentById,
    deleteStudent,
  };
};
