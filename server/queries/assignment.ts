import Prisma from "~/configs/db";

type File = {
  name: string;
  url: string;
};

//Administrator
export const getAssignments = async ({
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
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  return await Prisma.assignment.findMany({
    where,
    take: take,
    skip: skip,
    include: {
      Teacher: true,
      Class: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

//Teacher
export const addAssignment = async ({
  teacherId,
  title,
  classId,
  content,
  files,
  subjectId,
  deadline,
}: {
  teacherId: string;
  title: string;
  classId: string;
  content: string;
  files: File[];
  subjectId: string;
  deadline: Date;
}) => {
  return await Prisma.assignment.create({
    data: {
      title,
      content,
      deadline,
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
      Subject: {
        connect: {
          id: subjectId,
        },
      },

      MediaFile: {
        create: files.map((file) => ({
          name: file.name,
          url: file.url,
        })),
      },
    },
  });
};

export const deleteAssignment = async (id: string) => {
  return Prisma.assignment.delete({
    where: {
      id,
    },
  });
};

export const getAssignmentById = async (id: string) => {
  return await Prisma.assignment.findUnique({
    where: {
      id,
    },
    include: {
      MediaFile: true,
      StudentAssigment: {
        where: {
          assigment_id: id,
        },
        include: {
          Student: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
};

export const updateAssignment = async ({
  id,
  teacherId,
  title,
  content,
  deadline,
  classId,
  files,
  subjectId,
}: {
  id: string;
  teacherId: string;
  title: string;
  content: string;
  deadline: Date;
  classId: string;
  files: File[];
  subjectId: string;
}) => {
  return await Prisma.assignment.update({
    where: {
      id,
    },
    data: {
      title,
      content,
      deadline,
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
      Subject: {
        connect: {
          id: subjectId,
        },
      },
      MediaFile: {
        create: files.map((file) => ({
          name: file.name,
          url: file.url,
        })),
      },
    },
    include: {
      MediaFile: true,
    },
  });
};
