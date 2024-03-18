import Prisma from "../../configs/db";

export const getAdministratorByEmail = async (email: string) => {
  return Prisma.administrator.findUnique({
    where: {
      email,
    },
  });
};
