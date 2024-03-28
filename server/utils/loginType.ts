import { getAdministratorFromTokenByEmail } from "../queries/administrator";
import Bcryptjs from "bcryptjs";
import { getTeacherByEmail } from "../queries/teacher";
import { getStudentByEmail } from "../queries/student";

export const loginAsAdministrator = async (email: string, password: string) => {
  const administratorDB = await getAdministratorFromTokenByEmail(email);

  if (!administratorDB) {
    throw new ErrorWithCode(400, "Administrator not found");
  }

  const isPasswordMatch = await Bcryptjs.compare(
    password,
    administratorDB.password
  );

  if (!isPasswordMatch) {
    throw new ErrorWithCode(400, "Password is incorrect");
  }

  return {
    id: administratorDB.id,
    email: administratorDB.email,
    name: administratorDB.name,
    profile_image: administratorDB.profile_image,
    phone: administratorDB.phone,
  };
};

export const loginAsTeacher = async (email: string, password: string) => {
  const teacherDB = await getTeacherByEmail(email);

  if (!teacherDB) {
    throw new ErrorWithCode(400, "Teacher not found");
  }

  if (password !== teacherDB.password) {
    throw new ErrorWithCode(400, "Password is incorrect");
  }

  return {
    id: teacherDB.id,
    email: teacherDB.email,
    name: teacherDB.name,
    profile_image: teacherDB.profile_image,
    phone: teacherDB.phone,
  };
};

export const loginAsStudent = async (email: string, password: string) => {
  const studentDB = await getStudentByEmail(email);

  if (!studentDB) {
    throw new ErrorWithCode(400, "Student not found");
  }

  if (password !== studentDB.password) {
    throw new ErrorWithCode(400, "Password is incorrect");
  }

  return {
    id: studentDB.id,
    class_id: studentDB.class_id,
    email: studentDB.email,
    name: studentDB.name,
    profile_image: studentDB.profile_image,
    phone: studentDB.phone,
  };
};
