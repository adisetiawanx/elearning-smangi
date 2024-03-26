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
      `/api/administrator/subject?take=${take}&skip=${skip}&search=${search}`
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
      `/api/administrator/subject/${id}`
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
    getListSubjects,
    getSubjectById,
    deleteSubject,
  };
};
