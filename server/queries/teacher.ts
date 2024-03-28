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
  search,
}: {
  take: number | undefined;
  skip: number | undefined;
  search?: string | undefined;
}) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          email: {
            contains: search,
          },
        },
        {
          name: {
            contains: search,
          },
        },
        {
          nuptk: {
            contains: search,
          },
        },
        {
          phone: {
            contains: search,
          },
        },
      ],
    };
  }

  return await Prisma.teacher.findMany({
    take: take,
    skip: skip,
    where,
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

export const updateTeacher = async (teacherData: {
  id: string;
  email: string;
  name: string;
  password: string;
  nuptk: string;
  phone: string;
  profile_url: string;
}) => {
  return Prisma.teacher.update({
    where: {
      id: teacherData.id,
    },
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
      Subject: {
        select: {
          name: true,
          Class: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};

export const deleteTeacher = async (id: string) => {
  return Prisma.teacher.delete({
    where: {
      id,
    },
  });
};

export const getTeacherById = async (id: string) => {
  return Prisma.teacher.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      nuptk: true,
      password: true,
      phone: true,
      profile_image: true,
    },
  });
};
