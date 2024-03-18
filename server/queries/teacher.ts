import Prisma from "../../configs/db";

export const getTeacherByEmail = async (email: string) => {
  return Prisma.teacher.findUnique({
    where: {
      email,
    },
  });
};
