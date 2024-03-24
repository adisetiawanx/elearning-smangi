-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_class_name_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_class_name_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_class_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentAssigmentGrade" DROP CONSTRAINT "StudentAssigmentGrade_assigment_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentAssigmentGrade" DROP CONSTRAINT "StudentAssigmentGrade_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_teacher_id_fkey";

-- AlterTable
ALTER TABLE "Assignment" ALTER COLUMN "subject_id" DROP NOT NULL,
ALTER COLUMN "teacher_id" DROP NOT NULL,
ALTER COLUMN "class_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Material" ALTER COLUMN "class_name" DROP NOT NULL,
ALTER COLUMN "subject_id" DROP NOT NULL,
ALTER COLUMN "teacher_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "class_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentAssigmentGrade" ALTER COLUMN "student_id" DROP NOT NULL,
ALTER COLUMN "assigment_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "class_id" DROP NOT NULL,
ALTER COLUMN "teacher_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssigmentGrade" ADD CONSTRAINT "StudentAssigmentGrade_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAssigmentGrade" ADD CONSTRAINT "StudentAssigmentGrade_assigment_id_fkey" FOREIGN KEY ("assigment_id") REFERENCES "Assignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_class_name_fkey" FOREIGN KEY ("class_name") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
