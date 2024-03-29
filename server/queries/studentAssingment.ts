import { assign } from "lodash";
import Prisma from "../../configs/db";

type File = {
  name: string;
  url: string;
};

export const submitAssignmentForStudent = async ({
  studentId,
  assignmentId,
  description,
  proof_image,
  files,
}: {
  studentId: string;
  assignmentId: string;
  description: string;
  proof_image: string;
  files: File[];
}) => {
  return Prisma.studentAssigment.create({
    data: {
      description,
      proof_image,
      Student: {
        connect: {
          id: studentId,
        },
      },
      Assigment: {
        connect: {
          id: assignmentId,
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

export const getSubmmitedAssignment = async ({
  student_id,
  assigment_id,
}: {
  student_id: string;
  assigment_id: string;
}) => {
  return Prisma.studentAssigment.findMany({
    where: {
      student_id,
      assigment_id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteSubmmitedAssignment = async (id: string) => {
  return Prisma.studentAssigment.delete({
    where: {
      id,
    },
  });
};

export const getSubmmitedAssignmentById = async (id: string) => {
  return await Prisma.studentAssigment.findUnique({
    where: {
      id,
    },
    include: {
      MediaFile: true,
    },
  });
};

export const updateSubmmitedAssignmentForTeacher = (
  assignmentId: string,
  grade: number
) => {
  return Prisma.studentAssigment.update({
    where: {
      id: assignmentId,
    },
    data: {
      grade,
    },
    include: {
      MediaFile: true,
    },
  });
};
