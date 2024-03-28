export default () => {
  const getListMaterial = async ({
    take,
    skip,
    search,
  }: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/material?take=${take}&skip=${skip}&search=${search}`,
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

  const deleteMaterial = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/material/${id}`,
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

  const getMaterialByIdForTeacher = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/material/${id}`,
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

  return {
    getListMaterial,
    deleteMaterial,
    getMaterialByIdForTeacher,
  };
};
