export default () => {
  const getListKelas = async ({
    take,
    skip,
  }: {
    take: number | undefined;
    skip: number | undefined;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/class?take=${take}&skip=${skip}`
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
      //@ts-expect-error
      return respone.value.data;
    }
  };

  return {
    getListKelas,
    getKelasById,
  };
};
