export default () => {
  const getListMaterial = async ({
    take,
    skip,
  }: {
    take: number | undefined;
    skip: number | undefined;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/material?take=${take}&skip=${skip}`
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
    getListMaterial,
  };
};
