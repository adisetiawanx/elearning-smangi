export default () => {
  const getListSubjects = async ({
    take,
    skip,
  }: {
    take: number | undefined;
    skip: number | undefined;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/subject?take=${take}&skip=${skip}`
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

  const addSubjectToClass = async (classId: any, subjectName: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/class/subject`,
      {
        method: "POST",
        body: {
          class_id: classId,
          subject_name: subjectName,
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
    addSubjectToClass,
  };
};
