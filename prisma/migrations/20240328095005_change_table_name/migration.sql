/*
  Warnings:

  - You are about to drop the `StudentAssigmentGrade` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentAssigmentGrade" DROP CONSTRAINT "StudentAssigmentGrade_assigment_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentAssigmentGrade" DROP CONSTRAINT "StudentAssigmentGrade_student_id_fkey";

-- DropTable
DROP TABLE "StudentAssigmentGrade";

-- CreateTable
CREATE TABLE "StudentAssigment" (
    "id" TEXT NOT NULL,
    "student_id" TEXT,
    "assigment_id" TEXT,
    "grade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAssigment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentAssigment" ADD CONSTRAINT "StudentAssigment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssigment" ADD CONSTRAINT "StudentAssigment_assigment_id_fkey" FOREIGN KEY ("assigment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
