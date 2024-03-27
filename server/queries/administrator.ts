import Prisma from "../../configs/db";

export const getAdministratorFromTokenByEmail = async (email: string) => {
  return Prisma.administrator.findUnique({
    where: {
      email,
    },
  });
};

export const getAdministratorById = async (id: string) => {
  return Prisma.administrator.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      profile_image: true,
    },
  });
};

export const updateAdministrator = async ({
  id,
  name,
  email,
  phone,
  profile_image,
}: {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
}) => {
  return Prisma.administrator.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      phone,
      profile_image,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      profile_image: true,
    },
  });
};
