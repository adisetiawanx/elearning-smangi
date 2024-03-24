import Prisma from "../../configs/db";

export const getTeacherByEmail = async (email: string) => {
  return Prisma.teacher.findUnique({
    where: {
      email,
    },
  });
};

export const getTeachers = async ({
  take,
  skip,
}: {
  take: number | undefined;
  skip: number | undefined;
}) => {
  return await Prisma.teacher.findMany({
    take: take,
    skip: skip,
    select: {
      id: true,
      email: true,
      name: true,
      nuptk: true,
      phone: true,
      profile_image: true,
    },
  });
};

export const addTeacher = async (teacherData: {
  email: string;
  name: string;
  password: string;
  nuptk: string;
  phone: string;
  profile_url: string;
}) => {
  return Prisma.teacher.create({
    data: {
      email: teacherData.email,
      name: teacherData.name,
      password: teacherData.password,
      nuptk: teacherData.nuptk,
      phone: teacherData.phone,
      profile_image: teacherData.profile_url,
    },
  });
};

export const getTeacherByIdWithPassword = async (id: string) => {
  return Prisma.teacher.findUnique({
    where: {
      id,
    },
    include: {
      Subject: true,
    },
  });
};
