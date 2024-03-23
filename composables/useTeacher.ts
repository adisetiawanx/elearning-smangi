export default () => {
  const getTeachersData = async (querySiswa: {
    take: number;
    skip: number;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher?take=${querySiswa.take}&skip=${querySiswa.skip}`
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
      //@ts-expect-error
      return respone.value.data;
    }
  };

  const addTeacherToClass = async (teacherId: string, className: string) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/class`,
      {
        method: "POST",
        body: {
          teacher_id: teacherId,
          name: className,
        },
      }
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      alert("Berhasil menambahkan guru ke kelas");
    }
  };

  const addTeacherToSubject = async (
    teacherId: string,
    subjectName: string
  ) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/subject`,
      {
        method: "POST",
        body: {
          teacher_id: teacherId,
          subject_name: subjectName,
        },
      }
    );

    if (error.value) {
      alert(error.value.message);
      return;
    }

    if (respone.value) {
      alert("Berhasil menambahkan guru ke kelas");
    }
  };

  return {
    getTeachersData,
    getTeacherById,
    addTeacherToClass,
    addTeacherToSubject,
  };
};
