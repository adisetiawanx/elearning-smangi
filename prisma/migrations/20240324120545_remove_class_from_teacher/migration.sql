/*
  Warnings:

  - You are about to drop the `_ClassToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClassToTeacher" DROP CONSTRAINT "_ClassToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClassToTeacher" DROP CONSTRAINT "_ClassToTeacher_B_fkey";

-- DropTable
DROP TABLE "_ClassToTeacher";
