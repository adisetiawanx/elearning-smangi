import { jwtDecode } from "jwt-decode";

export default () => {
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
    getTeacherFromToken,
    getTeacher,
  };
};
