/*
  Warnings:

  - You are about to drop the column `nip` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the `AdministratorSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherSesssion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nis` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nuptk` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdministratorSession" DROP CONSTRAINT "AdministratorSession_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentSession" DROP CONSTRAINT "StudentSession_student_id_fkey";

-- DropForeignKey
ALTER TABLE "TeacherSesssion" DROP CONSTRAINT "TeacherSesssion_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "nip",
ADD COLUMN     "nis" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "nuptk" TEXT NOT NULL;

-- DropTable
DROP TABLE "AdministratorSession";

-- DropTable
DROP TABLE "StudentSession";

-- DropTable
DROP TABLE "TeacherSesssion";
