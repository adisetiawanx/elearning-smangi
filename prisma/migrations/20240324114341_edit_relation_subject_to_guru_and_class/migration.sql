/*
  Warnings:

  - You are about to drop the `_ClassToSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SubjectToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `class_id` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ClassToSubject" DROP CONSTRAINT "_ClassToSubject_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToSubject" DROP CONSTRAINT "_ClassToSubject_B_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_SubjectToTeacher" DROP CONSTRAINT "_SubjectToTeacher_B_fkey";

-- DropIndex
DROP INDEX "Subject_name_key";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "class_id" TEXT NOT NULL,
ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ClassToSubject";

-- DropTable
DROP TABLE "_SubjectToTeacher";

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
