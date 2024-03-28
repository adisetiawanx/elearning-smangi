import Prisma from "~/configs/db";

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
          class_name: {
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
export const getMaterialsForTeacher = async ({
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
  let where = {};
  if (search) {
    where = {
      OR: [
        {
          title: {
            contains: search,
          },
          class_name: {
            contains: search,
          },
        },
      ],
    };
  }

  return await Prisma.material.findMany({
    where: {
      teacher_id: teacher_id,
      ...where,
    },
    take: take,
    skip: skip,
  });
};
