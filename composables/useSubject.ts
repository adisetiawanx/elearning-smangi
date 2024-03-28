export default () => {
  const getListSubjects = async ({
    take,
    skip,
    search,
  }: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/subject?take=${take}&skip=${skip}&search=${search}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getSubjectById = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/subject/${id}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const deleteSubject = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/subject/${id}`,
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

  const getListSubjectsForTeacher = async ({
    take,
    skip,
    search,
  }: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/subject?take=${take}&skip=${skip}&search=${search}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getSubjectByIdForTeacher = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/subject/${id}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getListSubjectsForStudent = async ({
    take,
    skip,
    search,
  }: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/student/subject?take=${take}&skip=${skip}&search=${search}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getSubjectByIdForStudent = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/student/subject/${id}`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };
  return {
    getListSubjects,
    getSubjectById,
    deleteSubject,
    getListSubjectsForTeacher,
    getSubjectByIdForTeacher,
    getListSubjectsForStudent,
    getSubjectByIdForStudent,
  };
};
