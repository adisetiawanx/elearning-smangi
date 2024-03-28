import Prisma from "~/configs/db";

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

export const getAssignmentsForTeacher = async ({
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
      ...where,
      teacher_id: teacher_id,
    },
    take: take,
    skip: skip,
  });
};
