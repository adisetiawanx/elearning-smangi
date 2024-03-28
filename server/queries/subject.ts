import Prisma from "~/configs/db";

// Administrator
export const getSubject = async ({
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
          name: {
            contains: search,
          },
        },
      ],
    };
  }

  return await Prisma.subject.findMany({
    take: take,
    skip: skip,
    where,
    select: {
      id: true,
      name: true,
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      Teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getSubjectById = async (id: string) => {
  return await Prisma.subject.findUnique({
    where: {
      id: id,
    },
    include: {
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      Teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const addSubject = async ({
  name,
  classId,
  teacherId,
}: {
  name: string;
  classId: string;
  teacherId: string;
}) => {
  return await Prisma.subject.create({
    data: {
      name: name,
      Class: {
        connect: {
          id: classId,
        },
      },
      Teacher: {
        connect: {
          id: teacherId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });
};

export const updateSubject = async ({
  id,
  name,
  classId,
  teacherId,
}: {
  id: string;
  name: string;
  classId: string;
  teacherId: string;
}) => {
  return await Prisma.subject.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      Class: {
        connect: {
          id: classId,
        },
      },
      Teacher: {
        connect: {
          id: teacherId,
        },
      },
    },
  });
};

export const deleteSubject = async (id: string) => {
  return Prisma.subject.delete({
    where: {
      id,
    },
  });
};

//Teacher
export const getSubjectForTeacher = async ({
  take,
  skip,
  search,
  teacher_id,
}: {
  take: number | undefined;
  skip: number | undefined;
  search?: string | undefined;
  teacher_id: string;
}) => {
  return await Prisma.subject.findMany({
    take: take,
    skip: skip,
    where: {
      teacher_id: teacher_id,
      OR: [
        {
          Class: {
            name: {
              contains: search?.toLocaleUpperCase(),
            },
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      Teacher: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getSubjectByIdForTeacher = async (id: string) => {
  return await Prisma.subject.findUnique({
    where: {
      id: id,
    },
    include: {
      Class: {
        select: {
          id: true,
          name: true,
        },
      },
      Material: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
      Assignment: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      },
    },
  });
};
