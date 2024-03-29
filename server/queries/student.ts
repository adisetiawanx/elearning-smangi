import Prisma from "../../configs/db";

export const getStudentByEmail = async (email: string) => {
  return Prisma.student.findUnique({
    where: {
      email,
    },
  });
};

export const getStudents = async ({
  take,
  skip,
  search,
}: {
  take: number;
  skip: number;
  search?: string | undefined;
}) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          nis: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          phone: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  return Prisma.student.findMany({
    take: take,
    skip: skip,
    where,
    select: {
      id: true,
      name: true,
      email: true,
      Class: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getStudentByIdWithPassword = async (id: string) => {
  return Prisma.student.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      password: true,
      name: true,
      nis: true,
      phone: true,
      profile_image: true,
      Class: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const addStudent = async (studentData: {
  email: string;
  name: string;
  password: string;
  nis: string;
  phone: string;
  kelas: string;
  profile_url: string;
}) => {
  return await Prisma.student.create({
    data: {
      email: studentData.email,
      name: studentData.name,
      nis: studentData.nis,
      phone: studentData.phone,
      profile_image: studentData.profile_url,
      password: studentData.password,
      Class: {
        connect: {
          name: studentData.kelas,
        },
      },
    },
  });
};

export const updateStudent = async (studentData: {
  id: string;
  email: string;
  name: string;
  password: string;
  nis: string;
  phone: string;
  kelas: string;
  profile_url: string;
}) => {
  return Prisma.student.update({
    where: {
      id: studentData.id,
    },
    data: {
      email: studentData.email,
      name: studentData.name,
      nis: studentData.nis,
      phone: studentData.phone,
      profile_image: studentData.profile_url,
      password: studentData.password,
      Class: {
        connect: {
          name: studentData.kelas,
        },
      },
    },
    include: {
      Class: {
        select: {
          name: true,
        },
      },
    },
  });
};

export const deleteStudent = async (id: string) => {
  return Prisma.student.delete({
    where: {
      id,
    },
  });
};
