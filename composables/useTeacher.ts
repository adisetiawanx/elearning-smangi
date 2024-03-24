export default () => {
  const getTeachersData = async (queryTeacher: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher?take=${queryTeacher.take}&skip=${queryTeacher.skip}&search=${queryTeacher.search}`
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getTeacherById = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/${id}`
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const deleteTeacher = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/${id}`,
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
    getTeachersData,
    getTeacherById,
    deleteTeacher,
  };
};
