import { jwtDecode } from "jwt-decode";

export default () => {
  const getTeachersData = async (queryTeacher: {
    take: number | undefined;
    skip: number | undefined;
    search?: string;
  }) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher?take=${queryTeacher.take}&skip=${queryTeacher.skip}&search=${queryTeacher.search}`,
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

  const getTeacherById = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/${id}`,
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

  const deleteTeacher = async (id: any) => {
    const { data: respone, error } = await useFetch(
      `/api/administrator/teacher/${id}`,
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

  const getTeacherFromToken = () => {
    const token = useCookie("auth:token").value || "";
    const userData = jwtDecode(token);
    return userData;
  };

  const getTeacher = async () => {
    const { data: respone, error } = await useFetch(`/api/teacher/setting`, {
      headers: {
        Authorization: "Bearer " + useCookie("auth:token").value,
      },
    });

    if (error.value) {
      alert(error.value);
      return;
    }

    if (respone.value) {
      return respone.value.data;
    }
  };

  return {
    getTeachersData,
    getTeacherById,
    deleteTeacher,
    getTeacherFromToken,
    getTeacher,
  };
};
