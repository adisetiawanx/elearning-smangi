import Prisma from "~/configs/db";

type File = {
  name: string;
  url: string;
};

// Administrator
export const getMaterials = async ({
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
          },
        },
      ],
    };
  }

  return await Prisma.material.findMany({
    where,
    take: take,
    skip: skip,
  });
};

// Teacher
export const addMaterial = async ({
  teacherId,
  title,
  classId,
  content,
  files,
  subjectId,
}: {
  teacherId: string;
  title: string;
  classId: string;
  content: string;
  files: File[];
  subjectId: string;
}) => {
  return await Prisma.material.create({
    data: {
      title,
      content,
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

export const deleteMaterial = async (id: string) => {
  return await Prisma.material.delete({
    where: {
      id,
    },
  });
};

export const getMaterialById = async (id: string) => {
  return await Prisma.material.findUnique({
    where: {
      id,
    },
    include: {
      MediaFile: true,
    },
  });
};

export const updateMaterial = async ({
  id,
  teacherId,
  title,
  classId,
  content,
  files,
  subjectId,
}: {
  id: string;
  teacherId: string;
  title: string;
  classId: string;
  content: string;
  files: File[];
  subjectId: string;
}) => {
  return await Prisma.material.update({
    where: {
      id,
    },
    data: {
      title,
      content,
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
    select: {
      id: true,
      title: true,
      content: true,
      teacher_id: true,
      class_id: true,
      MediaFile: true,
      subject_id: true,
    },
  });
};
