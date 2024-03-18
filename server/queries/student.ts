import Prisma from "../../configs/db";

export const getStudentByEmail = async (email: string) => {
  return Prisma.student.findUnique({
    where: {
      email,
    },
  });
};

export const addStudent = async (dataSiswa: {
  email: string;
  name: string;
  password: string;
  nip: string;
  phone: string;
  kelas: string;
  profile_url: string;
}) => {
  return await Prisma.student.create({
    data: {
      email: dataSiswa.email,
      name: dataSiswa.name,
      nip: dataSiswa.nip,
      phone: dataSiswa.phone,
      profile_image: dataSiswa.profile_url,
      password: dataSiswa.password,
      Class: {
        connect: {
          name: dataSiswa.kelas,
        },
      },
    },
  });
};
