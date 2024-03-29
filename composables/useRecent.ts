export default () => {
  const getRecentForAdmin = async () => {
    let recentAssignments = [];
    let recentMaterials = [];

    const { data: respone1, error: error1 } = await useFetch(
      `/api/administrator/assignment?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error1.value) {
      alert(error1.value);
      return;
    }

    if (respone1.value) {
      //@ts-expect-error
      recentAssignments = respone1.value.data;
    }

    const { data: respone2, error: error2 } = await useFetch(
      `/api/administrator/material?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error2.value) {
      alert(error2.value);
      return;
    }

    if (respone2.value) {
      //@ts-expect-error
      recentMaterials = respone2.value.data;
    }

    return {
      recentAssignments,
      recentMaterials,
    };
  };

  const getRecentForTeacher = async () => {
    let recentAssignments = [];
    let recentMaterials = [];

    const { data: respone1, error: error1 } = await useFetch(
      `/api/teacher/assignment?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error1.value) {
      alert(error1.value);
      return;
    }

    if (respone1.value) {
      //@ts-expect-error
      recentAssignments = respone1.value.data;
    }

    const { data: respone2, error: error2 } = await useFetch(
      `/api/teacher/material?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error2.value) {
      alert(error2.value);
      return;
    }

    if (respone2.value) {
      //@ts-expect-error
      recentMaterials = respone2.value.data;
    }

    return {
      recentAssignments,
      recentMaterials,
    };
  };

  const getRecentForStudent = async () => {
    let recentAssignments = [];
    let recentMaterials = [];

    const { data: respone1, error: error1 } = await useFetch(
      `/api/student/assignment?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error1.value) {
      alert(error1.value);
      return;
    }

    if (respone1.value) {
      //@ts-expect-error
      recentAssignments = respone1.value.data;
    }

    const { data: respone2, error: error2 } = await useFetch(
      `/api/student/material?take=10&skip=0&search=`,
      {
        headers: {
          Authorization: "Bearer " + useCookie("auth:token").value,
        },
      }
    );

    if (error2.value) {
      alert(error2.value);
      return;
    }

    if (respone2.value) {
      //@ts-expect-error
      recentMaterials = respone2.value.data;
    }

    return {
      recentAssignments,
      recentMaterials,
    };
  };

  return {
    getRecentForAdmin,
    getRecentForTeacher,
    getRecentForStudent,
  };
};
