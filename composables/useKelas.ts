export default () => {
  const getListKelas = async ({
    take,
    skip,
    search,
  }: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/class?take=${take}&skip=${skip}&search=${search}`
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getKelasById = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/class/${id}`
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const deleteKelas = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/class/${id}`,
      {
        method: "DELETE",
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
    getListKelas,
    getKelasById,
    deleteKelas,
  };
};
