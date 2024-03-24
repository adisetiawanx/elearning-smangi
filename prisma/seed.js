import { PrismaClient } from "@prisma/client";
const Prisma = new PrismaClient();

async function main() {
  await Prisma.administrator.create({
    data: {
      email: "adisetiawanzx@gmail.com",
      name: "Adi Setiawan",
      password: "$2a$12$Jvg7NQHR3UP9CqO71wV3retu7F/cIz2lxNa9GgI7sTlMaFHu63GiS",
      phone: "081234567890",
      profile_image: "https://avatars.githubusercontent.com/u/47200040?v=4",
    },
  });

  const class1 = await Prisma.class.create({
    data: {
      name: "XII BAHASA 1",
      major: "BAHASA",
    },
  });

  const class2 = await Prisma.class.create({
    data: {
      name: "X IPS 1",
      major: "IPS",
    },
  });

  await Prisma.student.create({
    data: {
      email: "student1@gmail.com",
      name: "Student 1",
      password: "test1",
      nis: "1234567890",
      phone: "081234567890",
      profile_image: "https://avatars.githubusercontent.com/u/47200040?v=4",
      Class: {
        connect: {
          id: class1.id,
        },
      },
    },
  });

  await Prisma.teacher.create({
    data: {
      email: "teacher1@gmail.com",
      name: "Teacher 1",
      password: "test1",
      nuptk: "1234567890",
      phone: "081234567890",
      profile_image: "https://avatars.githubusercontent.com/u/47200040?v=4",
    },
  });
}
main()
  .then(async () => {
    await Prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await Prisma.$disconnect();
    process.exit(1);
  });
