export default () => {
  const getListAssignment = async ({
    take,
    skip,
    serach,
  }: {
    take: number | undefined;
    skip: number | undefined;
    serach: string | undefined;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/assignment?take=${take}&skip=${skip}&search=${serach}`,
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

  const deleteAssignment = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/assignment/${id}`,
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

  const getAssignmentByIdForTeacher = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/assignment/${id}`,
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

  const getAssignmentByIdForStudent = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/student/assignment/${id}`,
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

  const getSubmittedAssignmentForStudent = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/student/submit-assignment/${id}`,
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

  const deleteSubmittedAssignmentForStudent = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/student/submit-assignment/${id}`,
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
    getListAssignment,
    deleteAssignment,
    getAssignmentByIdForTeacher,
    getAssignmentByIdForStudent,
    getSubmittedAssignmentForStudent,
    deleteSubmittedAssignmentForStudent,
  };
};
