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
      `/api/administrator/assignment?take=${take}&skip=${skip}&search=${serach}`
    );

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  const getListAssignmentForTeacher = async ({
    take,
    skip,
    serach,
  }: {
    take: number | undefined;
    skip: number | undefined;
    serach: string | undefined;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/teacher/assignment?take=${take}&skip=${skip}&search=${serach}`
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
    getListAssignment,
    getListAssignmentForTeacher,
  };
};
